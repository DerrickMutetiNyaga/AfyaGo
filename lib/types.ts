export interface LabTest {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  turnaroundTime: string;
  requirements?: string[];
  popular?: boolean;
}

export interface LabPackage {
  id: string;
  name: string;
  description: string;
  tests: string[];
  price: number;
  originalPrice: number;
  popular?: boolean;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  tests: LabTest[];
  status: BookingStatus;
  scheduledDate: string;
  scheduledTime: string;
  address: string;
  collector?: Collector;
  paymentMethod: 'mpesa' | 'card';
  paymentStatus: 'pending' | 'completed' | 'failed';
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  prescriptionUrl?: string;
}

export type BookingStatus = 
  | 'confirmed'
  | 'collector_assigned'
  | 'collector_en_route'
  | 'sample_collected'
  | 'processing'
  | 'results_ready';

export interface Collector {
  id: string;
  name: string;
  photo: string;
  phone: string;
  rating: number;
  eta?: string;
  location?: {
    lat: number;
    lng: number;
  };
}

export interface TestResult {
  id: string;
  bookingId: string;
  testName: string;
  result: string;
  normalRange: string;
  status: 'normal' | 'abnormal' | 'critical';
  date: string;
  labName: string;
  verifiedBy: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
}
