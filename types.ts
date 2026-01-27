
export interface FormData {
  fullName: string;
  plate: string;
  personCount: string;
  description: string;
}

export interface LocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  loading: boolean;
}

export enum AppStage {
  SPLASH = 'SPLASH',
  MAIN = 'MAIN',
  FORM = 'FORM',
  PRICES = 'PRICES',
  CONTACT = 'CONTACT',
  QR = 'QR'
}
