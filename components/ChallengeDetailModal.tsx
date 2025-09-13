import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { Challenge } from '../types';
import { ChallengeType } from '../types';
import { verifyImageWithGemini } from '../services/geminiService';
import { convertFileToBase64 } from '../utils/image';
import { calculateDistance } from '../utils/location';
import useGeolocation from '../hooks/useGeolocation';

// Add BarcodeDetector to window type for TypeScript
declare global {
  interface Window {
    BarcodeDetector: any;
  }
}

interface ChallengeDetailModalProps {
  challenge: Challenge;
  onClose: () => void;
  onComplete: (challengeId: string, points: number) => void;
}

const ChallengeDetailModal: React.FC<ChallengeDetailModalProps> = ({ challenge, onClose, onComplete }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { location, error: geoError, getLocation } = useGeolocation();

  // For QR Scanner
  const [isScannerActive, setIsScannerActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  // FIX: Changed `useRef<number>()` to `useRef<number | null>(null)` for explicit initialization.
  const scanRequestRef = useRef<number | null>(null);

  const stopScanner = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    streamRef.current = null;
    if (scanRequestRef.current) {
      cancelAnimationFrame(scanRequestRef.current);
    }
    setIsScannerActive(false);
  }, []);

  // Effect for QR scanner lifecycle
  useEffect(() => {
    if (challenge.type !== ChallengeType.QR || !('BarcodeDetector' in window)) {
      return;
    }

    const startScanner = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setIsScannerActive(true);
          setIsLoading(false);

          const barcodeDetector = new window.BarcodeDetector({ formats: ['qr_code'] });

          const detectQrCode = async () => {
            if (!streamRef.current || !videoRef.current || videoRef.current.paused) {
              return;
            }
            try {
              const barcodes = await barcodeDetector.detect(videoRef.current);
              if (barcodes.length > 0) {
                const scannedValue = barcodes[0].rawValue;
                if (scannedValue === challenge.data.qrCodeValue) {
                  onComplete(challenge.id, challenge.points);
                  return; // Stop scanning on success
                }
              }
            } catch (e) {
              console.error("QR detection error", e);
              // Do not set error, as it can be transient. Let it retry.
            }
            scanRequestRef.current = requestAnimationFrame(detectQrCode);
          };
          scanRequestRef.current = requestAnimationFrame(detectQrCode);
        }
      } catch (err) {
        setError("ไม่สามารถเข้าถึงกล้องได้ โปรดอนุญาตและลองอีกครั้ง");
        console.error("Camera access error:", err);
        setIsLoading(false);
      }
    };

    startScanner();

    return () => { // Cleanup function
      stopScanner();
    };
  }, [challenge, onComplete, stopScanner]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    switch (challenge.type) {
      case ChallengeType.QUESTION:
        if (inputValue.toLowerCase() === String(challenge.data.answer).toLowerCase()) {
          onComplete(challenge.id, challenge.points);
        } else {
          setError('คำตอบไม่ถูกต้อง ลองใหม่อีกครั้ง');
        }
        break;
      
      case ChallengeType.QR:
        if (inputValue === challenge.data.qrCodeValue) {
          onComplete(challenge.id, challenge.points);
        } else {
          setError('รหัสลับไม่ถูกต้อง');
        }
        break;

      case ChallengeType.PHOTO:
        if (imageFile && challenge.data.verificationPrompt) {
            try {
                const base64Image = await convertFileToBase64(imageFile);
                const isVerified = await verifyImageWithGemini(base64Image, challenge.data.verificationPrompt);
                if(isVerified) {
                    onComplete(challenge.id, challenge.points);
                } else {
                    setError('ภาพไม่ตรงกับภารกิจที่กำหนด กรุณาลองใหม่อีกครั้ง');
                }
            } catch (err) {
                setError('เกิดข้อผิดพลาดในการตรวจสอบภาพ');
                console.error(err);
            }
        }
        break;
      
      case ChallengeType.GPS:
          // GPS completion is handled by useEffect
          break;
    }
    setIsLoading(false);
  };
  
  const handleGpsCheckIn = () => {
    setIsLoading(true);
    setError(null);
    getLocation();
  };

  useEffect(() => {
    if (challenge.type === ChallengeType.GPS && location) {
      const target = challenge.data.targetCoordinates;
      if (target && location.latitude && location.longitude) {
        const distance = calculateDistance(
          { latitude: location.latitude, longitude: location.longitude },
          { latitude: target.lat, longitude: target.lng }
        );
        // Distance is in km, check if within 100 meters (0.1 km)
        if (distance < 0.1) {
          onComplete(challenge.id, challenge.points);
        } else {
          setError(`คุณอยู่ห่างจากเป้าหมายเกินไป (${(distance * 1000).toFixed(0)} เมตร)`);
        }
      }
      setIsLoading(false);
    }
  }, [location, challenge, onComplete]);

  useEffect(() => {
    if (geoError) {
      setError(`ไม่สามารถเข้าถึงตำแหน่งได้: ${geoError}`);
      setIsLoading(false);
    }
  }, [geoError]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setError(null); // Clear error on new file selection
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoRetry = () => {
    setError(null);
    setImageFile(null);
    setImagePreview(null);
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const renderChallengeContent = () => {
    switch (challenge.type) {
      case ChallengeType.QUESTION:
        return (
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder={"พิมพ์คำตอบของคุณ"}
            disabled={isLoading}
          />
        );
       case ChallengeType.QR: {
        const isScannerSupported = 'BarcodeDetector' in window;

        if (!isScannerSupported) {
          return (
            <div>
              <p className="text-sm text-slate-500 mb-2">เบราว์เซอร์ของคุณไม่รองรับการสแกน กรุณากรอกรหัสด้วยตนเอง</p>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg"
                placeholder="กรอกรหัสลับจาก QR Code"
                disabled={isLoading}
              />
            </div>
          );
        }

        return (
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-full max-w-xs aspect-square bg-slate-800 rounded-lg overflow-hidden shadow-inner">
              <video 
                  ref={videoRef} 
                  playsInline 
                  className={`w-full h-full object-cover transition-opacity duration-300 ${isScannerActive ? 'opacity-100' : 'opacity-0'}`} 
              />
              <div className="absolute inset-0 pointer-events-none">
                  {!isScannerActive && !error && (
                       <div className="absolute inset-0 flex items-center justify-center text-white bg-black/50">
                          <p>กำลังเปิดกล้อง...</p>
                      </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                      <div className="w-full h-full border-4 border-white/50 rounded-lg animate-pulse" style={{boxShadow: '0 0 0 999px rgba(0,0,0,0.5)'}}></div>
                  </div>
              </div>
            </div>
            {error && (
               <div className="w-full">
                  <p className="text-sm text-slate-500 mb-2">การสแกนล้มเหลว กรุณากรอกรหัสด้วยตนเอง</p>
                  <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="w-full p-3 border border-slate-300 rounded-lg"
                      placeholder="กรอกรหัสลับจาก QR Code"
                      disabled={isLoading}
                  />
              </div>
            )}
          </div>
        );
      }
      case ChallengeType.PHOTO:
        const photoVerificationFailed = !!error;
        return (
          <div className="flex flex-col items-center gap-4">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="max-h-60 w-auto rounded-lg shadow-md" />
            ) : (
                <div className="w-full h-40 bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center text-slate-500">
                    ดูตัวอย่างรูปภาพที่นี่
                </div>
            )}
            
            {/* On verification failure, hide the upload controls to present a clear "Try Again" path. */}
            {!photoVerificationFailed && (
              <>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={isLoading}
                />
                <label htmlFor="file-upload" className={`w-full text-center p-3 rounded-lg ${isLoading ? 'bg-slate-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'}`}>
                  {imageFile ? 'เปลี่ยนรูปภาพ' : 'เลือกรูปภาพ'}
                </label>
              </>
            )}
          </div>
        );
      case ChallengeType.GPS:
        return (
          <button onClick={handleGpsCheckIn} disabled={isLoading} className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-slate-300">
            {isLoading ? 'กำลังตรวจสอบตำแหน่ง...' : 'กดเพื่อเช็คอิน'}
          </button>
        );
      default:
        return null;
    }
  };

  const isScannerSupported = 'BarcodeDetector' in window;
  const showSubmitButton =
    challenge.type === ChallengeType.QUESTION ||
    (challenge.type === ChallengeType.QR && (!isScannerSupported || !!error));

  const photoVerificationFailed = challenge.type === ChallengeType.PHOTO && !!error;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 transition-opacity" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 sm:p-8 relative transform transition-transform scale-95 animate-modal-pop-in" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">&times;</button>
        <h2 className="text-2xl font-bold mb-2 text-slate-800">{challenge.title}</h2>
        <p className="text-slate-500 mb-6">{challenge.description}</p>
        
        <form onSubmit={handleSubmit}>
          {renderChallengeContent()}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          
          {/* Default submit button for non-photo challenges */}
          {showSubmitButton && (
            <button type="submit" disabled={isLoading} className="w-full p-3 mt-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-slate-300 font-semibold">
              {isLoading ? 'กำลังตรวจสอบ...' : 'ส่งคำตอบ'}
            </button>
          )}

          {/* Special button logic for Photo challenge: toggles between Submit and Try Again */}
          {challenge.type === ChallengeType.PHOTO && (
            photoVerificationFailed ? (
              <button
                type="button"
                onClick={handlePhotoRetry}
                className="w-full p-3 mt-6 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 font-semibold"
              >
                ลองใหม่อีกครั้ง
              </button>
            ) : (
              <button type="submit" disabled={isLoading || !imageFile} className="w-full p-3 mt-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-slate-300 font-semibold">
                {isLoading ? 'กำลังตรวจสอบ...' : 'ส่งคำตอบ'}
              </button>
            )
          )}
        </form>

        <style>{`
            @keyframes modal-pop-in {
                from {
                    opacity: 0;
                    transform: scale(0.95) translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: scale(1) translateY(0);
                }
            }
            .animate-modal-pop-in {
                animation: modal-pop-in 0.3s ease-out forwards;
            }
        `}</style>
      </div>
    </div>
  );
};

export default ChallengeDetailModal;