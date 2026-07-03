export interface Guest {
  id: string;
  name: string;
  guestsCount: number;
  isConfirmed: boolean;
  dietaryRequirements: string;
  rsvpDate: string;
  comment?: string;
}

export interface GiftItem {
  id: string;
  name: string;
  category: string;
  isReserved: boolean;
  reservedBy?: string;
}
