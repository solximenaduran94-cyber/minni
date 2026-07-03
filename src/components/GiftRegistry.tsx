import React, { useState } from "react";
import { GiftItem } from "../types";
import { Gift, Lock, CheckCircle2, ShoppingBag, Filter } from "lucide-react";

interface GiftRegistryProps {
  gifts: GiftItem[];
  onReserveGift: (id: string, name: string) => void;
}

export default function GiftRegistry({ gifts, onReserveGift }: GiftRegistryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [reservingId, setReservingId] = useState<string | null>(null);
  const [gifterName, setGifterName] = useState("");

  const categories = ["Todos", "Higiene", "Alimentación", "Ropa", "Juguetes", "Accesorios"];

  const filteredGifts = selectedCategory === "Todos"
    ? gifts
    : gifts.filter(g => g.category === selectedCategory);

  const handleReserveSubmit = (e: React.FormEvent, giftId: string) => {
    e.preventDefault();
    if (!gifterName.trim()) return;
    onReserveGift(giftId, gifterName.trim());
    setReservingId(null);
    setGifterName("");
  };

  return (
    <div className="w-full bg-white border-2 border-pink-100 rounded-3xl shadow-xl overflow-hidden" id="registry-section">
      {/* Header Banner */}
      <div className="bg-pink-500 text-white py-4 px-6 text-center relative overflow-hidden bg-polka-white">
        <div className="absolute top-1/2 left-3 -translate-y-1/2 opacity-30 text-white animate-pulse">🎁</div>
        <div className="absolute top-1/2 right-3 -translate-y-1/2 opacity-30 text-white animate-pulse">🎁</div>
        <h3 className="font-comfortaa text-lg font-bold flex items-center justify-center gap-2">
          <Gift size={20} />
          Lista de Regalos / Wishlist
        </h3>
        <p className="text-pink-100 text-xs mt-0.5 font-medium">Si querés hacernos un regalo, podés reservar una opción acá</p>
      </div>

      <div className="p-6">
        {/* Category filters */}
        <div className="flex gap-1.5 overflow-x-auto pb-4 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all whitespace-nowrap cursor-pointer border ${
                selectedCategory === cat
                  ? "bg-pink-500 text-white border-pink-500 shadow-sm"
                  : "bg-pink-50/30 text-gray-500 border-pink-100 hover:bg-pink-50/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gift grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1 max-h-[440px] overflow-y-auto pr-1">
          {filteredGifts.map((gift) => (
            <div
              key={gift.id}
              className={`p-3.5 border rounded-2xl transition-all relative flex flex-col justify-between ${
                gift.isReserved
                  ? "bg-gray-50 border-gray-100 text-gray-400"
                  : "bg-white border-pink-100/60 hover:border-pink-200 hover:shadow-xs"
              }`}
            >
              <div className="flex justify-between items-start gap-2 mb-2">
                <div>
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block ${
                    gift.isReserved
                      ? "bg-gray-100 text-gray-400"
                      : "bg-pink-100 text-pink-700"
                  }`}>
                    {gift.category}
                  </span>
                  <h4 className={`text-xs sm:text-sm font-semibold mt-1.5 ${gift.isReserved ? "line-through text-gray-400" : "text-gray-800"}`}>
                    {gift.name}
                  </h4>
                </div>

                {gift.isReserved ? (
                  <div className="text-gray-400 shrink-0 bg-gray-100 p-1.5 rounded-full">
                    <Lock size={14} />
                  </div>
                ) : (
                  <div className="text-pink-500 shrink-0 bg-pink-50 p-1.5 rounded-full">
                    <ShoppingBag size={14} />
                  </div>
                )}
              </div>

              {/* Reserve action footer */}
              <div className="mt-2.5 pt-2.5 border-t border-dashed border-pink-50">
                {gift.isReserved ? (
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 bg-gray-100/50 p-1.5 rounded-xl">
                    <CheckCircle2 size={13} className="text-green-500" />
                    <span>Reservado por {gift.reservedBy}</span>
                  </div>
                ) : reservingId === gift.id ? (
                  <form onSubmit={(e) => handleReserveSubmit(e, gift.id)} className="space-y-2">
                    <div className="text-[10px] font-bold text-pink-600 uppercase">¿Quién reserva este regalo?</div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        placeholder="Tu nombre..."
                        value={gifterName}
                        onChange={(e) => setGifterName(e.target.value)}
                        className="flex-1 px-2 py-1 border border-pink-200 rounded-lg text-xs bg-white text-gray-800 focus:outline-hidden focus:ring-1 focus:ring-pink-400"
                      />
                      <button
                        type="submit"
                        className="bg-pink-500 hover:bg-pink-600 active:bg-pink-700 text-white font-bold text-xs px-2.5 py-1 rounded-lg transition-all cursor-pointer"
                      >
                        OK
                      </button>
                      <button
                        type="button"
                        onClick={() => setReservingId(null)}
                        className="bg-gray-100 text-gray-500 text-xs px-2.5 py-1 rounded-lg hover:bg-gray-200 transition-all cursor-pointer"
                      >
                        X
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={() => {
                      setReservingId(gift.id);
                      setGifterName("");
                    }}
                    className="w-full py-1.5 bg-pink-50 hover:bg-pink-100 text-pink-700 font-bold text-xs rounded-xl transition-all border border-pink-100 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>🎁 Reservar este regalo</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
