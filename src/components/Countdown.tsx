import { useState, useEffect } from "react";
import { EVENT_DETAILS } from "../data";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false,
  });

  useEffect(() => {
    const targetDate = new Date(EVENT_DETAILS.datetimeValue).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isOver: false });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  if (timeLeft.isOver) {
    return (
      <div className="text-center py-6">
        <span className="font-comfortaa text-xl text-pink-600 font-bold block animate-bounce">
          🎉 ¡Llegó el día! Te esperamos para festejar 🎉
        </span>
      </div>
    );
  }

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center bg-white/70 backdrop-blur-xs border border-pink-100 rounded-2xl p-3 sm:p-4 shadow-sm w-20 sm:w-24">
      <span className="font-comfortaa text-2xl sm:text-3xl font-bold text-gray-800">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-pink-500 uppercase mt-1">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex flex-col items-center py-4 w-full">
      <h3 className="font-comfortaa text-xs sm:text-sm font-bold uppercase tracking-widest text-pink-500 mb-4 flex items-center gap-1.5">
        <span>✦</span> CUENTA REGRESIVA <span>✦</span>
      </h3>
      <div className="flex gap-2 sm:gap-4 justify-center">
        <TimeBlock value={timeLeft.days} label="Días" />
        <TimeBlock value={timeLeft.hours} label="Horas" />
        <TimeBlock value={timeLeft.minutes} label="Minutos" />
        <TimeBlock value={timeLeft.seconds} label="Segundos" />
      </div>
    </div>
  );
}
