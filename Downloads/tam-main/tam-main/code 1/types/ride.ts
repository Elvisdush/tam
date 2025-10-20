export interface Ride {
  id: number;
  from: string;
  to: string;
  price: number;
  transportType: 'car' | 'motorbike';
  driverId: string | null;
  passengerId: string | null;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  createdAt: string;
}