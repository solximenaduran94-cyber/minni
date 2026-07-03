import { useState, useEffect, useRef } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";

export default function LullabyPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalIdRef = useRef<number | null>(null);

  // Twinkle Twinkle Little Star / Estrellita dónde estás
  // Notes and their frequencies (Hz)
  const melody = [
    { freq: 261.63, duration: 500 }, // C4
    { freq: 261.63, duration: 500 }, // C4
    { freq: 392.00, duration: 500 }, // G4
    { freq: 392.00, duration: 500 }, // G4
    { freq: 440.00, duration: 500 }, // A4
    { freq: 440.00, duration: 500 }, // A4
    { freq: 392.00, duration: 1000 }, // G4 (long)
    { freq: 349.23, duration: 500 }, // F4
    { freq: 349.23, duration: 500 }, // F4
    { freq: 329.63, duration: 500 }, // E4
    { freq: 329.63, duration: 500 }, // E4
    { freq: 293.66, duration: 500 }, // D4
    { freq: 293.66, duration: 500 }, // D4
    { freq: 261.63, duration: 1000 }, // C4 (long)
  ];

  const playNote = (freq: number, duration: number, time: number) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;

    // Create a music box bell sound using sine + gentle envelope
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    // Soft chime sound
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, time);

    // Filter to make it warmer
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1200, time);

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Chime envelope: Instant attack, long decay
    gainNode.gain.setValueAtTime(0, time);
    gainNode.gain.linearRampToValueAtTime(0.12, time + 0.05); // low volume so it doesn't startle
    gainNode.gain.exponentialRampToValueAtTime(0.0001, time + duration / 1000 - 0.05);

    osc.start(time);
    osc.stop(time + duration / 1000);
  };

  const startMusic = () => {
    try {
      // Initialize Audio Context on user gesture
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }

      setIsPlaying(true);

      let currentNoteIndex = 0;
      let nextNoteTime = audioCtxRef.current.currentTime;

      // Queue notes continuously using an interval
      const scheduleMelody = () => {
        if (!audioCtxRef.current) return;
        const ctx = audioCtxRef.current;

        // Schedule notes for the next 2 seconds
        while (nextNoteTime < ctx.currentTime + 1.5) {
          const note = melody[currentNoteIndex];
          playNote(note.freq, note.duration, nextNoteTime);
          
          nextNoteTime += note.duration / 1000 + 0.1; // Add brief pause between notes
          currentNoteIndex = (currentNoteIndex + 1) % melody.length;
        }
      };

      scheduleMelody();
      const interval = setInterval(scheduleMelody, 1000);
      intervalIdRef.current = interval as unknown as number;

    } catch (e) {
      console.error("Audio Context failed to start:", e);
    }
  };

  const stopMusic = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
    setIsPlaying(false);
  };

  const togglePlayback = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  useEffect(() => {
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center py-2 px-4 bg-pink-50/50 rounded-full border border-pink-100 shadow-xs max-w-xs mx-auto">
      <button
        onClick={togglePlayback}
        className="flex items-center gap-2.5 px-4 py-2 bg-pink-500 hover:bg-pink-600 active:bg-pink-700 text-white font-comfortaa text-xs font-bold rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
        id="btn-music"
      >
        {isPlaying ? (
          <>
            <VolumeX size={14} className="animate-pulse" />
            <span>Pausar Canción de Cuna</span>
          </>
        ) : (
          <>
            <Volume2 size={14} className="animate-bounce" />
            <span>Reproducir Música de Cuna</span>
          </>
        )}
      </button>

      {isPlaying && (
        <div className="flex gap-0.5 items-end justify-center mt-2 h-4 w-12">
          <div className="w-1 bg-pink-400 rounded-xs animate-[float_1.2s_ease-in-out_infinite_alternate] h-2"></div>
          <div className="w-1 bg-pink-400 rounded-xs animate-[float_0.8s_ease-in-out_infinite_alternate] h-3"></div>
          <div className="w-1 bg-pink-400 rounded-xs animate-[float_1.5s_ease-in-out_infinite_alternate] h-1"></div>
          <div className="w-1 bg-pink-400 rounded-xs animate-[float_1s_ease-in-out_infinite_alternate] h-4"></div>
          <div className="w-1 bg-pink-400 rounded-xs animate-[float_0.7s_ease-in-out_infinite_alternate] h-2.5"></div>
        </div>
      )}
    </div>
  );
}
