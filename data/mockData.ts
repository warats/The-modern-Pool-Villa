
import type { Challenge, Reward } from '../types';
import { ChallengeType } from '../types';

export const challenges: Challenge[] = [
  {
    id: '1',
    type: ChallengeType.QUESTION,
    title: 'คำถามเกี่ยวกับวิลล่า',
    description: 'วิลล่าของเราเปิดให้บริการครั้งแรกในปีใด?',
    points: 10,
    data: {
      question: 'วิลล่าของเราเปิดให้บริการครั้งแรกในปีใด?',
      answer: '2018',
    },
  },
  {
    id: '2',
    type: ChallengeType.QR,
    title: 'สแกน QR Code ที่สระว่ายน้ำ',
    description: 'มองหา QR Code ที่ซ่อนอยู่บริเวณสระว่ายน้ำ แล้วกรอกรหัสลับเพื่อรับคะแนน',
    points: 15,
    data: {
      qrCodeValue: 'POOL_SECRET_CODE',
    },
  },
  {
    id: '3',
    type: ChallengeType.PHOTO,
    title: 'ถ่ายภาพพระอาทิตย์ตก',
    description: 'ถ่ายภาพพระอาทิตย์ตกที่สวยงามที่สุดจากระเบียงห้องของคุณ แล้วอัปโหลดให้ AI ของเราตรวจสอบ',
    points: 25,
    data: {
      verificationPrompt: 'Does this image contain a sunset or sunrise over a scenic view, possibly with water or mountains? Respond with only "YES" or "NO".',
    },
  },
  {
    id: '4',
    type: ChallengeType.GPS,
    title: 'เช็คอินที่ชายหาดส่วนตัว',
    description: 'เดินทางไปยังชายหาดส่วนตัวของวิลล่า แล้วกดปุ่มเช็คอินเพื่อยืนยันตำแหน่งของคุณ',
    points: 20,
    data: {
      targetCoordinates: { lat: 13.736717, lng: 100.523186 }, // Example: Bangkok
    },
  },
  {
    id: '5',
    type: ChallengeType.PHOTO,
    title: 'ถ่ายภาพเมนูอาหารเช้า',
    description: 'ถ่ายภาพอาหารเช้าสุดพิเศษของคุณที่ห้องอาหารของวิลล่า',
    points: 15,
    data: {
        verificationPrompt: 'Is there food, particularly breakfast items like eggs, bread, fruit or coffee, in this image? Respond with only "YES" or "NO".'
    }
  },
];

export const rewards: Reward[] = [
  {
    id: 'reward1',
    title: 'เครื่องดื่มฟรี 1 แก้ว',
    description: 'รับเครื่องดื่ม Mocktail สดชื่นฟรี 1 แก้วที่บาร์ริมสระ',
    pointsRequired: 20,
  },
  {
    id: 'reward2',
    title: 'ส่วนลดสปา 15%',
    description: 'ผ่อนคลายกับส่วนลด 15% สำหรับทุกแพ็คเกจสปา',
    pointsRequired: 40,
  },
  {
    id: 'reward3',
    title: 'อัปเกรดห้องพัก',
    description: 'รับสิทธิ์อัปเกรดห้องพักเป็นประเภทถัดไป (ขึ้นอยู่กับความพร้อมให้บริการ)',
    pointsRequired: 75,
  },
];
