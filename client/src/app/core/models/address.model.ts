export interface Address {
  id: number;
  title: string;
  details: string;
  type: 'home' | 'work' | 'other';
  isPrivateHouse?: boolean;
  entrance?: string;
  floor?: string;
  apartment?: string;
  intercom?: string;
  lat?: number;
  lng?: number;
}
