import React, { useState } from "react";
import { Guest } from "../types";
import { Sparkles, CalendarCheck, Users, HeartHandshake, Utensils, MessageSquareHeart } from "lucide-react";

interface RsvpFormProps {
  guests: Guest[];
  onAddGuest: (newGuest: Omit<Guest, "id" | "rsvpDate">) => void;
}

export default function RsvpForm({ guests, onAddGuest }: RsvpFormProps) {
  const [name, setName] = useState("");
  const [guestsCount, setGuestsCount] = useState(1);
  const [isConfirmed, setIsConfirmed] = useState(true);
  const [dietary, setDietary] = useState("Ninguna");
  const [customDietary, setCustomDietary] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddGuest({
      name: name.trim(),
      guestsCount,
      isConfirmed,
      dietaryRequirements: dietary === "Otra" ? customDietary.trim() || "Otras restricciones" : dietary,
      comment: comment.trim() || undefined,
    });

    setSubmitted(true);
    
    // Reset form fields
    setTimeout(() => {
      setName("");
      setGuestsCount(1);
      setIsConfirmed(true);
      setDietary("Ninguna");
      setCustomDietary("");
      setComment("");
    }, 500);
  };

  return (
    <div className="w-full bg-white border-2 border-pink-100 rounded-3xl shadow-xl overflow-hidden" id="rsvp-section">
      {/* Header Banner */}
      <div className="bg-pink-500 text-white py-4 px-6 text-center relative overflow-hidden bg-polka-white">
        <div className="absolute top-1/2 left-3 -translate-y-1/2 opacity-30 text-white animate-pulse">🎀</div>
        <div className="absolute top-1/2 right-3 -translate-y-1/2 opacity-30 text-white animate-pulse">🎀</div>
        <h3 className="font-comfortaa text-lg font-bold flex items-center justify-center gap-2">
          <CalendarCheck size={20} />
          Confirmar Asistencia
        </h3>
        <p className="text-pink-100 text-xs mt-0.5 font-medium">Por favor, confirmanos antes del 5 de Octubre</p>
      </div>

      <div className="p-6">
        {submitted ? (
          <div className="text-center py-8 px-4 flex flex-col items-center">
            <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mb-4 animate-bounce">
              <Sparkles size={32} />
            </div>
            <h4 className="font-comfortaa text-xl font-bold text-pink-600">¡Muchas Gracias!</h4>
            <p className="text-gray-600 text-sm mt-2 max-w-sm">
              Tu respuesta ha sido guardada con éxito. {isConfirmed ? "¡Te esperamos para pasar una tarde hermosa! 🎀🍼" : "Lamentamos que no puedas venir, ¡gracias por avisarnos!"}
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 text-xs text-pink-500 hover:text-pink-600 font-bold underline cursor-pointer"
            >
              Confirmar para otra persona
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <span>Tu Nombre Completo / Familia</span>
                <span className="text-pink-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ej. Sofía Bianchi, Familia Martínez..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 border border-pink-100 rounded-2xl bg-pink-50/20 text-gray-800 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all text-sm"
              />
            </div>

            {/* Attendance Toggle */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                ¿Vas a poder venir?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setIsConfirmed(true)}
                  className={`py-2 px-4 rounded-2xl font-comfortaa text-xs font-bold transition-all border flex items-center justify-center gap-1.5 cursor-pointer ${
                    isConfirmed
                      ? "bg-pink-500 border-pink-500 text-white shadow-sm"
                      : "bg-white border-pink-100 text-gray-500 hover:bg-pink-50/30"
                  }`}
                >
                  <span>🎀 Sí, ¡ahí estaré!</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsConfirmed(false)}
                  className={`py-2 px-4 rounded-2xl font-comfortaa text-xs font-bold transition-all border flex items-center justify-center gap-1.5 cursor-pointer ${
                    !isConfirmed
                      ? "bg-gray-700 border-gray-700 text-white shadow-sm"
                      : "bg-white border-pink-100 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <span>No puedo ir 😢</span>
                </button>
              </div>
            </div>

            {isConfirmed && (
              <>
                {/* Guests Count */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Users size={14} className="text-pink-400" />
                    ¿Cuántos van a ser en total?
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setGuestsCount(num)}
                        className={`flex-1 py-1.5 text-xs font-bold font-comfortaa rounded-xl transition-all border cursor-pointer ${
                          guestsCount === num
                            ? "bg-pink-100 border-pink-400 text-pink-700"
                            : "bg-white border-pink-100 text-gray-500 hover:bg-pink-50/20"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dietary Requirements */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Utensils size={14} className="text-pink-400" />
                    Restricciones Alimentarias / Menú Especial
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Ninguna", "Vegetariano/a", "Sin TACC", "Otra"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setDietary(opt)}
                        className={`py-1.5 text-left px-3 text-xs rounded-xl transition-all border cursor-pointer ${
                          dietary === opt
                            ? "bg-pink-100 border-pink-400 text-pink-700 font-medium"
                            : "bg-white border-pink-100 text-gray-500 hover:bg-pink-50/20"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {dietary === "Otra" && (
                    <input
                      type="text"
                      required
                      placeholder="Ej. Diabético, Alergia a frutos secos..."
                      value={customDietary}
                      onChange={(e) => setCustomDietary(e.target.value)}
                      className="w-full mt-2 px-3 py-1.5 border border-pink-100 rounded-xl bg-pink-50/10 text-gray-800 text-xs focus:outline-hidden focus:ring-2 focus:ring-pink-400"
                    />
                  )}
                </div>
              </>
            )}

            {/* Comment/Wishes */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <MessageSquareHeart size={14} className="text-pink-400" />
                Un lindo mensaje para Emma y sus papás (Opcional)
              </label>
              <textarea
                rows={2}
                placeholder="¡Qué alegría tan inmensa! Les deseamos lo mejor..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-4 py-2 border border-pink-100 rounded-2xl bg-pink-50/20 text-gray-800 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all text-sm resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-pink-500 hover:bg-pink-600 active:bg-pink-700 text-white font-comfortaa text-sm font-bold rounded-2xl shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
              id="submit-rsvp"
            >
              <HeartHandshake size={18} />
              Enviar Mi Confirmación
            </button>
          </form>
        )}

        {/* Live Guest Counter & List */}
        <div className="mt-8 pt-6 border-t border-pink-50">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-comfortaa text-xs font-bold uppercase tracking-wider text-gray-600">
              Invitados Confirmados ({guests.filter(g => g.isConfirmed).reduce((acc, curr) => acc + curr.guestsCount, 0)})
            </h4>
            <span className="text-[10px] bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full font-bold">
              {guests.filter(g => g.isConfirmed).length} Familias
            </span>
          </div>

          {/* List scroll container */}
          <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
            {guests.map((g) => (
              <div
                key={g.id}
                className="p-2.5 bg-pink-50/30 border border-pink-100/50 rounded-xl text-xs flex justify-between items-start gap-2"
              >
                <div>
                  <span className="font-bold text-gray-700">{g.name}</span>
                  {g.guestsCount > 1 && (
                    <span className="text-[10px] text-pink-500 font-semibold ml-1.5 bg-pink-100/60 px-1.5 py-0.2 rounded-md">
                      +{g.guestsCount - 1} {g.guestsCount === 2 ? "acompañante" : "acompañantes"}
                    </span>
                  )}
                  {g.comment && (
                    <p className="text-gray-500 italic mt-1 font-sans font-light">
                      &ldquo;{g.comment}&rdquo;
                    </p>
                  )}
                  {g.dietaryRequirements && g.dietaryRequirements !== "Ninguna" && (
                    <span className="inline-block mt-1 text-[9px] bg-amber-50 border border-amber-200 text-amber-700 px-1.5 py-0.2 rounded-md font-semibold">
                      🍽️ {g.dietaryRequirements}
                    </span>
                  )}
                </div>
                <span className="text-[9px] text-gray-400 font-medium whitespace-nowrap self-center bg-white border border-gray-100 px-1.5 py-0.5 rounded-md">
                  Confirmado
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
