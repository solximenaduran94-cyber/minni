import { Guest, GiftItem } from './types';

export const EVENT_DETAILS = {
  babyName: "Emma",
  parents: "Sofía y Leandro",
  dateString: "Jueves 15 de Octubre de 2026",
  timeString: "16:00 hs",
  datetimeValue: "2026-10-15T16:00:00",
  venueName: "Salón Magic Kingdom",
  address: "Rivadavia 450, Quilmes",
  city: "Quilmes, Buenos Aires",
  gpsCoords: "Rivadavia 450, Quilmes, Buenos Aires, Argentina",
  dressCode: "Elegante Sport con un toque rosa, blanco o dorado",
};

export const INITIAL_GUESTS: Guest[] = [
  {
    id: "g1",
    name: "Tía Marcela y flia.",
    guestsCount: 3,
    isConfirmed: true,
    dietaryRequirements: "Ninguna",
    rsvpDate: "2026-06-20",
    comment: "¡No veo la hora de abrazar a Emma! 💕",
  },
  {
    id: "g2",
    name: "Paula y Facu",
    guestsCount: 2,
    isConfirmed: true,
    dietaryRequirements: "Sin TACC (celíaco Facu)",
    rsvpDate: "2026-06-21",
    comment: "¡Qué emoción! Ahí estaremos con todo listo 🎉",
  },
  {
    id: "g3",
    name: "Abuela Nélida",
    guestsCount: 1,
    isConfirmed: true,
    dietaryRequirements: "Ninguna",
    rsvpDate: "2026-06-18",
    comment: "La bisabuela más ansiosa del mundo 👶✨",
  },
  {
    id: "g4",
    name: "Mauri y Gaby",
    guestsCount: 2,
    isConfirmed: true,
    dietaryRequirements: "Vegetariana (Gaby)",
    rsvpDate: "2026-06-25",
    comment: "¡Súper felices por ustedes! Nos vemos el 15.",
  },
  {
    id: "g5",
    name: "Luli Bianchi",
    guestsCount: 1,
    isConfirmed: true,
    dietaryRequirements: "Ninguna",
    rsvpDate: "2026-06-28",
    comment: "¡Qué hermosa temática de Minnie! 🎀",
  }
];

export const INITIAL_GIFTS: GiftItem[] = [
  { id: "w1", name: "Pañales Pampers Premium Care Recién Nacido (RN)", category: "Higiene", isReserved: false },
  { id: "w2", name: "Pañales Pampers Premium Care Talle P", category: "Higiene", isReserved: true, reservedBy: "Tía Marcela" },
  { id: "w3", name: "Mamadera Avent Anti-colic 125ml", category: "Alimentación", isReserved: false },
  { id: "w4", name: "Set de babitas y baberos de algodón rosa", category: "Ropa", isReserved: false },
  { id: "w5", name: "Manta de apego Minnie Mouse rosa", category: "Juguetes", isReserved: true, reservedBy: "Luli Bianchi" },
  { id: "w6", name: "Termómetro digital para agua y ambiente", category: "Higiene", isReserved: false },
  { id: "w7", name: "Set de higiene (cepillo, peine, alicate de uñas)", category: "Higiene", isReserved: false },
  { id: "w8", name: "Sonajero de Minnie de felpa suave", category: "Juguetes", isReserved: false },
  { id: "w9", name: "Body de algodón manga larga talle 0-3 meses", category: "Ropa", isReserved: false },
  { id: "w10", name: "Gimnasio interactivo de Minnie Mouse", category: "Juguetes", isReserved: false },
  { id: "w11", name: "Set de toalla con capucha rosa", category: "Higiene", isReserved: false },
  { id: "w12", name: "Bolso maternal impermeable con cambiador", category: "Accesorios", isReserved: true, reservedBy: "Abuela Nélida" },
];
