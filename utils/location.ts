
interface Coordinates {
  latitude: number;
  longitude: number;
}

// Function to convert degrees to radians
const toRad = (value: number): number => {
  return (value * Math.PI) / 180;
};

// Haversine formula to calculate distance between two lat/lng points
export const calculateDistance = (start: Coordinates, end: Coordinates): number => {
  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(end.latitude - start.latitude);
  const dLon = toRad(end.longitude - start.longitude);
  const lat1 = toRad(start.latitude);
  const lat2 = toRad(end.latitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
};
