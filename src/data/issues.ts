export interface Issue {
  id: string;
  emoji: string;
  label: string;
  vehicles: ('car' | 'bike')[];
  isOther?: boolean;
}

export const mainIssues: Issue[] = [
  { id: 'tyre-puncture', emoji: '🔧', label: 'Tyre Puncture', vehicles: ['car', 'bike'] },
  { id: 'petrol-ended', emoji: '⛽', label: 'Petrol Ended', vehicles: ['car', 'bike'] },
  { id: 'chain-broke', emoji: '🔗', label: 'Chain Broke', vehicles: ['bike'] },
  { id: 'battery-dead', emoji: '🔋', label: 'Battery Dead', vehicles: ['car', 'bike'] },
  { id: 'engine-stopped', emoji: '🚗', label: 'Engine Stopped', vehicles: ['car', 'bike'] },
  { id: 'engine-overheating', emoji: '🌡️', label: 'Engine Overheating', vehicles: ['car', 'bike'] },
  { id: 'brake-failure', emoji: '💨', label: 'Brake Failure', vehicles: ['car', 'bike'] },
  { id: 'key-locked', emoji: '🔑', label: 'Key Locked / Lost', vehicles: ['car', 'bike'] },
  { id: 'electrical-issue', emoji: '💡', label: 'Electrical Issue', vehicles: ['car', 'bike'] },
  { id: 'spare-tyre', emoji: '🛞', label: 'Spare Tyre Needed', vehicles: ['car'] },
  { id: 'ac-not-working', emoji: '🌬️', label: 'AC Not Working', vehicles: ['car'] },
  { id: 'clutch-problem', emoji: '🔩', label: 'Clutch Problem', vehicles: ['bike'] },
  { id: 'gear-problem', emoji: '🪛', label: 'Gear Problem', vehicles: ['bike'] },
  { id: 'other', emoji: '❓', label: 'Other Issues', vehicles: ['car', 'bike'], isOther: true },
];

export const otherIssues: Issue[] = [
  { id: 'exhaust-problem', emoji: '🔧', label: 'Exhaust Problem', vehicles: ['car', 'bike'] },
  { id: 'oil-leakage', emoji: '💧', label: 'Oil Leakage', vehicles: ['car', 'bike'] },
  { id: 'unusual-noise', emoji: '🔊', label: 'Unusual Noise', vehicles: ['car', 'bike'] },
  { id: 'indicator-light', emoji: '🚦', label: 'Indicator / Light Issue', vehicles: ['car', 'bike'] },
  { id: 'coolant-leakage', emoji: '🛢️', label: 'Coolant Leakage', vehicles: ['car', 'bike'] },
  { id: 'suspension-issue', emoji: '🔄', label: 'Suspension Issue', vehicles: ['car', 'bike'] },
  { id: 'tow-required', emoji: '🪝', label: 'Tow Required', vehicles: ['car', 'bike'] },
  { id: 'other-ac', emoji: '🌬️', label: 'AC Not Working', vehicles: ['car'] },
];

export interface Mechanic {
  id: string;
  name: string;
  rating: number;
  distance: number;
  eta: number;
  fee: number;
  badge: 'Nearest' | 'Best Price' | null;
  avatar: string;
}

export const mechanics: Mechanic[] = [
  { id: '1', name: 'Ali Karigar', rating: 4.8, distance: 1.2, eta: 8, fee: 300, badge: 'Nearest', avatar: '/src/assets/mechanic-ali.jpg' },
  { id: '2', name: 'Usman Ustaad', rating: 4.5, distance: 2.4, eta: 14, fee: 250, badge: 'Best Price', avatar: '/src/assets/mechanic-usman.jpg' },
  { id: '3', name: 'FastFix Mehmood', rating: 4.2, distance: 3.8, eta: 22, fee: 400, badge: null, avatar: '/src/assets/mechanic-mehmood.jpg' },
];
