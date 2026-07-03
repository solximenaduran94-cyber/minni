import { EVENT_DETAILS } from "../data";
import { Calendar, MapPin, Clock, ExternalLink } from "lucide-react";

export default function InvitationCard() {
  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(EVENT_DETAILS.gpsCoords)}`;

  // Google Calendar Link generator
  const getCalendarLink = () => {
    const title = `Baby Shower de ${EVENT_DETAILS.babyName} 🎀`;
    const details = `¡Te esperamos para celebrar el Baby Shower de ${EVENT_DETAILS.babyName}! Temática de Minnie Mouse. Dirección: ${EVENT_DETAILS.address}, ${EVENT_DETAILS.city}`;
    const location = `${EVENT_DETAILS.address}, ${EVENT_DETAILS.city}`;
    
    // October 15, 2026 at 16:00 to 19:00 (UTC-3 is Argentina time)
    // 20261015T190000Z to 20261015T220000Z (assuming UTC standard is offset +3 hours for UTC-3)
    const dates = "20261015T190000Z/20261015T220000Z";
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${dates}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-[#FAF5F6] border-8 border-double border-pink-200 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden bg-polka">
      {/* Decorative Golden Corner Flourishes */}
      <div className="absolute top-2 left-2 text-amber-400 font-serif opacity-40 text-xl pointer-events-none">✦</div>
      <div className="absolute top-2 right-2 text-amber-400 font-serif opacity-40 text-xl pointer-events-none">✦</div>
      <div className="absolute bottom-2 left-2 text-amber-400 font-serif opacity-40 text-xl pointer-events-none">✦</div>
      <div className="absolute bottom-2 right-2 text-amber-400 font-serif opacity-40 text-xl pointer-events-none">✦</div>

      {/* Main card background paper overlay */}
      <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-5 sm:p-7 border border-pink-100 shadow-inner flex flex-col items-center text-center relative">
        
        {/* Magic Minnie Mouse Head with Pink Polka Bow Vector SVG */}
        <div className="mb-4 relative">
          {/* Subtle sparkle indicators */}
          <span className="absolute -top-1 -left-2 text-amber-400 text-lg animate-[sparkle_2s_infinite]">★</span>
          <span className="absolute bottom-2 -right-3 text-pink-400 text-base animate-[sparkle_2.5s_infinite_0.5s]">★</span>
          <span className="absolute top-6 -right-5 text-amber-400 text-xs animate-[sparkle_1.8s_infinite_1s]">✦</span>

          <svg viewBox="0 0 200 180" className="w-36 h-32 sm:w-40 sm:h-36 mx-auto drop-shadow-md">
            {/* Left Ear */}
            <circle cx="55" cy="65" r="35" fill="#1F2937" />
            {/* Right Ear */}
            <circle cx="145" cy="65" r="35" fill="#1F2937" />
            {/* Main Head */}
            <circle cx="100" cy="115" r="50" fill="#1F2937" />
            
            {/* Minnie Pink Polka Dot Bow */}
            {/* Left Wing of Bow */}
            <path d="M 100,85 C 70,55 55,95 100,95 Z" fill="#F472B6" stroke="#DB2777" strokeWidth="2" />
            <circle cx="76" cy="80" r="3" fill="#FFFFFF" />
            <circle cx="84" cy="74" r="3" fill="#FFFFFF" />
            <circle cx="82" cy="88" r="3" fill="#FFFFFF" />
            
            {/* Right Wing of Bow */}
            <path d="M 100,85 C 130,55 145,95 100,95 Z" fill="#F472B6" stroke="#DB2777" strokeWidth="2" />
            <circle cx="124" cy="80" r="3" fill="#FFFFFF" />
            <circle cx="116" cy="74" r="3" fill="#FFFFFF" />
            <circle cx="118" cy="88" r="3" fill="#FFFFFF" />
            
            {/* Center knot */}
            <circle cx="100" cy="87" r="11" fill="#F472B6" stroke="#DB2777" strokeWidth="2" />
            <circle cx="100" cy="87" r="3.5" fill="#FFFFFF" />
          </svg>
        </div>

        {/* Cursive Subtitle */}
        <span className="font-cursive text-3xl sm:text-4xl text-pink-500 font-bold tracking-wide">
          Baby Shower
        </span>

        {/* Cursive Baby Name */}
        <h1 className="font-comfortaa text-4xl sm:text-5xl font-extrabold text-gray-800 tracking-tight mt-1.5 mb-1 flex items-center justify-center gap-1">
          <span className="text-pink-500">E</span>mma
          <span className="text-pink-400 text-xl font-normal">🎀</span>
        </h1>

        {/* Tiny Divider */}
        <div className="w-16 h-[2px] bg-pink-200 my-3"></div>

        {/* Loving greeting */}
        <p className="text-gray-600 text-xs sm:text-sm max-w-xs leading-relaxed font-sans font-medium mb-5">
          Te invitamos a compartir una tarde mágica y celebrar junto a nosotros la llegada de nuestra pequeña.
        </p>

        {/* Parent credit lines */}
        <p className="text-[10px] uppercase tracking-wider font-bold text-pink-400 mb-6">
          Papás: <span className="text-gray-700">{EVENT_DETAILS.parents}</span>
        </p>

        {/* Details List */}
        <div className="w-full space-y-4 text-left border-t border-b border-pink-50 py-5 my-1">
          
          {/* Date info */}
          <div className="flex items-start gap-3">
            <div className="bg-pink-100/60 p-2 rounded-xl text-pink-600 mt-0.5">
              <Calendar size={16} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-pink-500 block">Fecha</span>
              <span className="text-sm font-bold text-gray-800">{EVENT_DETAILS.dateString}</span>
            </div>
          </div>

          {/* Time info */}
          <div className="flex items-start gap-3">
            <div className="bg-pink-100/60 p-2 rounded-xl text-pink-600 mt-0.5">
              <Clock size={16} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-pink-500 block">Horario</span>
              <span className="text-sm font-bold text-gray-800">{EVENT_DETAILS.timeString}</span>
            </div>
          </div>

          {/* Venue Location info */}
          <div className="flex items-start gap-3">
            <div className="bg-pink-100/60 p-2 rounded-xl text-pink-600 mt-0.5">
              <MapPin size={16} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-pink-500 block">Lugar y Dirección</span>
              <span className="text-sm font-bold text-gray-800 block">{EVENT_DETAILS.venueName}</span>
              <span className="text-xs text-gray-500 block mt-0.5">{EVENT_DETAILS.address}</span>
              <span className="text-xs text-gray-400 block">{EVENT_DETAILS.city}</span>
            </div>
          </div>

        </div>

        {/* Dress code banner */}
        <div className="mt-4 p-2.5 bg-pink-50/50 border border-pink-100/60 rounded-xl w-full text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-pink-500 block">Dress Code</span>
          <span className="text-xs font-semibold text-gray-600">{EVENT_DETAILS.dressCode}</span>
        </div>

        {/* Interactive map button */}
        <div className="grid grid-cols-2 gap-3 w-full mt-5">
          <a
            href={mapSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white border border-pink-200 hover:bg-pink-50/30 text-pink-600 text-xs font-bold rounded-xl transition-all shadow-xs hover:shadow-sm cursor-pointer text-center"
          >
            <MapPin size={14} />
            <span>Ver en Mapa</span>
            <ExternalLink size={10} className="opacity-60" />
          </a>

          <a
            href={getCalendarLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-pink-500 hover:bg-pink-600 active:bg-pink-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer text-center"
          >
            <Calendar size={14} />
            <span>Agendar Evento</span>
          </a>
        </div>

      </div>
    </div>
  );
}
