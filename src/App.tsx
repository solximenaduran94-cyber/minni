import { useState, useEffect } from "react";
import { Guest, GiftItem } from "./types";
import { INITIAL_GUESTS, INITIAL_GIFTS } from "./data";
import InvitationCard from "./components/InvitationCard";
import Countdown from "./components/Countdown";
import RsvpForm from "./components/RsvpForm";
import GiftRegistry from "./components/GiftRegistry";
import LullabyPlayer from "./components/LullabyPlayer";
import { Heart, Sparkles, AlertCircle } from "lucide-react";

export default function App() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [gifts, setGifts] = useState<GiftItem[]>([]);

  // Initialize data from localStorage or fallback
  useEffect(() => {
    const storedGuests = localStorage.getItem("baby_shower_guests");
    if (storedGuests) {
      try {
        setGuests(JSON.parse(storedGuests));
      } catch (e) {
        setGuests(INITIAL_GUESTS);
      }
    } else {
      setGuests(INITIAL_GUESTS);
      localStorage.setItem("baby_shower_guests", JSON.stringify(INITIAL_GUESTS));
    }

    const storedGifts = localStorage.getItem("baby_shower_gifts");
    if (storedGifts) {
      try {
        setGifts(JSON.parse(storedGifts));
      } catch (e) {
        setGifts(INITIAL_GIFTS);
      }
    } else {
      setGifts(INITIAL_GIFTS);
      localStorage.setItem("baby_shower_gifts", JSON.stringify(INITIAL_GIFTS));
    }
  }, []);

  // Handler to add a new RSVP guest
  const handleAddGuest = (newGuest: Omit<Guest, "id" | "rsvpDate">) => {
    const guestObj: Guest = {
      ...newGuest,
      id: "guest_" + Date.now(),
      rsvpDate: new Date().toISOString().split("T")[0],
    };

    const updatedGuests = [guestObj, ...guests];
    setGuests(updatedGuests);
    localStorage.setItem("baby_shower_guests", JSON.stringify(updatedGuests));
  };

  // Handler to reserve a gift
  const handleReserveGift = (id: string, name: string) => {
    const updatedGifts = gifts.map((item) => {
      if (item.id === id) {
        return { ...item, isReserved: true, reservedBy: name };
      }
      return item;
    });

    setGifts(updatedGifts);
    localStorage.setItem("baby_shower_gifts", JSON.stringify(updatedGifts));
  };

  // Reset demo simulation helper
  const handleResetDemo = () => {
    if (window.confirm("¿Querés reiniciar la lista de invitados y regalos a su estado original?")) {
      setGuests(INITIAL_GUESTS);
      setGifts(INITIAL_GIFTS);
      localStorage.setItem("baby_shower_guests", JSON.stringify(INITIAL_GUESTS));
      localStorage.setItem("baby_shower_gifts", JSON.stringify(INITIAL_GIFTS));
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-[#FFF5F6] via-[#FFFBFB] to-[#FFF0F2] text-gray-800 pb-16 antialiased selection:bg-pink-200">
      
      {/* Visual Floating Confetti Ornaments (Pure Decorative CSS/SVG shapes) */}
      <div className="absolute top-12 left-10 text-pink-200 text-3xl pointer-events-none animate-bounce select-none">🎈</div>
      <div className="absolute top-24 right-12 text-pink-200 text-4xl pointer-events-none animate-[float_5s_infinite] select-none">🎈</div>
      <div className="absolute bottom-40 left-8 text-pink-100 text-3xl pointer-events-none animate-[float_7s_infinite] select-none">👶</div>
      <div className="absolute bottom-20 right-10 text-pink-100 text-3xl pointer-events-none animate-bounce select-none">🍼</div>

      {/* Header section with branding, title */}
      <header className="max-w-7xl mx-auto px-4 pt-10 pb-6 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-100 border border-pink-200 text-pink-700 text-xs font-bold rounded-full mb-3 shadow-xs">
          <Heart size={12} className="fill-pink-500 text-pink-500 animate-pulse" />
          <span>INVITACIÓN DIGITAL DE MINNIE MOUSE</span>
        </div>
        <h2 className="font-comfortaa text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
          ¡Nos preparamos para recibir a <span className="text-pink-500">Emma</span>!
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-2 font-sans font-medium">
          Compartí esta tarjeta digital e interactuá con el RSVP y la lista de regalos en tiempo real.
        </p>

        {/* Dynamic ambient music controller */}
        <div className="mt-4">
          <LullabyPlayer />
        </div>
      </header>

      {/* Main Single-View Bento/Grid Container */}
      <main className="max-w-6xl mx-auto px-4 mt-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (Invitation Card & Countdown) - occupies 5 cols in large screens */}
        <div className="lg:col-span-5 space-y-6 flex flex-col items-center">
          
          {/* Main Card Graphic */}
          <InvitationCard />

          {/* Real-time Event Countdown */}
          <div className="w-full max-w-lg">
            <Countdown />
          </div>

        </div>

        {/* Right Column (RSVP & Gift Registry) - occupies 7 cols in large screens */}
        <div className="lg:col-span-7 space-y-8 w-full">
          
          {/* Interactive RSVP confirmation form & guest counter */}
          <RsvpForm guests={guests} onAddGuest={handleAddGuest} />

          {/* Interactive Wishlist gift reservation system */}
          <GiftRegistry gifts={gifts} onReserveGift={handleReserveGift} />

        </div>

      </main>

      {/* Footer & Simulation reset trigger */}
      <footer className="max-w-md mx-auto px-4 mt-16 text-center border-t border-pink-100/60 pt-6">
        <p className="font-cursive text-2xl text-pink-400 font-semibold mb-2">Con amor, Sofía y Leandro 🎀</p>
        <p className="text-[10px] text-gray-400 font-medium">
          Diseño Premium para el Baby Shower de Emma. Quilmes, Buenos Aires.
        </p>
        
        {/* Reset tool for the demo */}
        <div className="mt-6 flex justify-center items-center gap-1.5">
          <button
            onClick={handleResetDemo}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-500 text-[10px] font-bold rounded-lg transition-all border border-gray-200 cursor-pointer"
          >
            <AlertCircle size={10} />
            <span>Reiniciar Datos de Prueba</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
