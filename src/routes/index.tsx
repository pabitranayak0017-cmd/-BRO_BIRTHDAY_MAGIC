import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import confetti from "canvas-confetti";

import brotherMain from "@/assets/brother-main.asset.json";
import m1 from "@/assets/m1.asset.json";
import m2 from "@/assets/m2.asset.json";
import m3 from "@/assets/m3.asset.json";
import m4 from "@/assets/m4.asset.json";
import m5 from "@/assets/m5.asset.json";
import m6 from "@/assets/m6.asset.json";
import m7 from "@/assets/m7.asset.json";
import m8 from "@/assets/m8.asset.json";
import memoryVideo from "@/assets/memory-video.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A Special Surprise for My Big Brother ❤️" },
      { name: "description", content: "A heartfelt birthday surprise for the world's best brother." },
      { property: "og:title", content: "Happy Birthday Bhai ❤️" },
      { property: "og:description", content: "A heartfelt birthday surprise for the world's best brother." },
    ],
  }),
  component: BirthdayPage,
});

// ------- Background ambient elements -------
function FloatingAmbience() {
  const balloons = useMemo(
    () => Array.from({ length: 14 }).map((_, i) => ({
      left: Math.random() * 100,
      delay: Math.random() * 14,
      duration: 14 + Math.random() * 14,
      size: 30 + Math.random() * 36,
      color: ["#e6c068", "#d8b04a", "#f3d98a", "#b48a2a", "#fff1c8"][i % 5],
      key: i,
    })),
    []
  );
  const stars = useMemo(
    () => Array.from({ length: 60 }).map((_, i) => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: 1 + Math.random() * 2.5,
      delay: Math.random() * 4,
      duration: 2 + Math.random() * 3,
      key: i,
    })),
    []
  );
  const petals = useMemo(
    () => Array.from({ length: 12 }).map((_, i) => ({
      left: Math.random() * 100,
      delay: Math.random() * 12,
      duration: 10 + Math.random() * 12,
      size: 12 + Math.random() * 14,
      key: i,
    })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {/* radial light */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 50% 20%, oklch(0.82 0.15 85 / 0.18), transparent 60%), radial-gradient(ellipse at 80% 80%, oklch(0.5 0.18 280 / 0.18), transparent 60%)"
      }} />
      {/* stars */}
      {stars.map(s => (
        <div key={`s-${s.key}`} className="absolute rounded-full bg-gold animate-twinkle"
          style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size,
            animationDelay: `${s.delay}s`, animationDuration: `${s.duration}s`,
            boxShadow: "0 0 6px currentColor" }} />
      ))}
      {/* balloons */}
      {balloons.map(b => (
        <div key={`b-${b.key}`} className="absolute animate-float-up"
          style={{ left: `${b.left}%`, bottom: 0, animationDelay: `${b.delay}s`, animationDuration: `${b.duration}s` }}>
          <div style={{ width: b.size, height: b.size * 1.18, background: `radial-gradient(circle at 30% 30%, #fff6, ${b.color})`, borderRadius: "50%", boxShadow: `0 0 20px ${b.color}55` }} />
          <div style={{ width: 1, height: b.size * 0.9, background: "#fff4", margin: "0 auto" }} />
        </div>
      ))}
      {/* petals */}
      {petals.map(p => (
        <div key={`p-${p.key}`} className="absolute animate-petal" style={{ left: `${p.left}%`, top: 0, animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s` }}>
          <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="#f3d98a" opacity="0.7">
            <path d="M12 2c3 4 6 7 6 11a6 6 0 1 1-12 0c0-4 3-7 6-11z" />
          </svg>
        </div>
      ))}
    </div>
  );
}

// ------- Lock Screen -------
function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [shake, setShake] = useState(false);
  const [hint, setHint] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = value.trim().toLowerCase().replace(/\s+/g, " ");
    if (v === "i love u bhai" || v === "i love you bhai") {
      onUnlock();
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 450);
    }
  };

  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <div className={`glass-strong rounded-3xl p-8 md:p-12 max-w-lg w-full text-center shadow-gold ${shake ? "animate-shake" : ""}`}>
        <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-gold flex items-center justify-center shadow-glow animate-glow-pulse">
          <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="oklch(0.14 0.04 265)" strokeWidth="2">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 1 1 8 0v4" />
          </svg>
        </div>
        <p className="font-script text-3xl md:text-4xl text-gradient-gold mb-2">A Special Surprise</p>
        <h1 className="font-display text-3xl md:text-5xl font-semibold text-foreground leading-tight">
          for My Big Brother <span className="text-gold">❤️</span>
        </h1>
        <p className="mt-4 text-muted-foreground font-sans text-sm md:text-base">
          Enter the secret word to reveal the surprise
        </p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          <input
            type="password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter the magic words"
            className="w-full text-center font-sans text-base bg-navy-deep/60 border border-gold/30 rounded-xl px-4 py-4 focus:outline-none focus:border-gold focus:shadow-gold transition placeholder:text-muted-foreground/60"
            autoFocus
          />
          <button type="submit" className="w-full bg-gold text-primary-foreground font-sans font-semibold tracking-wide py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-gold">
            Unlock the Surprise 🔓
          </button>
          <button type="button" onClick={() => setHint(true)} className="text-xs text-muted-foreground hover:text-gold transition">
            Need a hint?
          </button>
          {hint && <p className="text-xs text-gold/80 font-sans">Hint: 4 little words from your small bro ❤️ ("I love u bhai")</p>}
        </form>
      </div>
    </div>
  );
}

// ------- Countdown -------
function Countdown() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  // countdown to June 28 (this year, or next year if already passed)
  const target = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    let d = new Date(year, 5, 28, 0, 0, 0, 0); // June = month 5
    if (d.getTime() < now.getTime()) d = new Date(year + 1, 5, 28, 0, 0, 0, 0);
    return d.getTime();
  }, []);
  const diff = Math.max(0, target - now);
  const d = Math.floor(diff / 8.64e7);
  const h = Math.floor((diff % 8.64e7) / 3.6e6);
  const m = Math.floor((diff % 3.6e6) / 6e4);
  const s = Math.floor((diff % 6e4) / 1000);
  const Box = ({ v, l }: { v: number; l: string }) => (
    <div className="glass rounded-2xl px-5 py-4 min-w-[84px] text-center">
      <div className="font-display text-3xl md:text-4xl text-gold tabular-nums">{String(v).padStart(2, "0")}</div>
      <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground font-sans mt-1">{l}</div>
    </div>
  );
  return (
    <div className="flex gap-3 md:gap-4 justify-center flex-wrap">
      <Box v={d} l="Days" /><Box v={h} l="Hours" /><Box v={m} l="Minutes" /><Box v={s} l="Seconds" />
    </div>
  );
}

// ------- Typing -------
function Typing({ text, className }: { text: string; className?: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (i >= text.length) return;
    const t = setTimeout(() => setI(i + 1), 38);
    return () => clearTimeout(t);
  }, [i, text]);
  return (
    <span className={className}>
      {text.slice(0, i)}
      <span className="inline-block w-[2px] h-[1em] align-middle ml-1 border-r-2 border-gold" style={{ animation: "blink-caret 1s steps(1) infinite" }} />
    </span>
  );
}

// ------- Cake -------
function Cake() {
  const [candles, setCandles] = useState([true, true, true, true, true]);
  const allOut = candles.every(c => !c);
  const blow = (idx: number) => {
    setCandles(c => c.map((v, i) => (i === idx ? false : v)));
    confetti({ particleCount: 30, spread: 40, origin: { y: 0.6 } });
  };
  useEffect(() => {
    if (allOut) {
      confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 }, colors: ["#e6c068", "#fff1c8", "#d8b04a"] });
    }
  }, [allOut]);
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-[280px] md:w-[360px]">
        {/* candles */}
        <div className="flex justify-around px-8 mb-1">
          {candles.map((lit, idx) => (
            <button key={idx} onClick={() => lit && blow(idx)} className="relative flex flex-col items-center cursor-pointer group" aria-label="Blow candle">
              {lit && (
                <div className="w-3 h-5 rounded-full bg-gradient-to-t from-orange-500 to-yellow-200 animate-flicker"
                  style={{ boxShadow: "0 0 16px #ffb84d, 0 0 32px #ffb84d80" }} />
              )}
              <div className="w-1.5 h-8 bg-gradient-to-b from-yellow-100 to-yellow-300 rounded-sm" />
            </button>
          ))}
        </div>
        {/* tiers */}
        <div className="h-12 rounded-t-xl bg-gradient-to-b from-[#f3d98a] to-[#b48a2a] border-x-2 border-t-2 border-gold/40 mx-6" />
        <div className="h-16 bg-gradient-to-b from-[#3a1f4a] to-[#1a0f24] border-x-2 border-gold/40 mx-2 relative">
          <div className="absolute inset-x-0 top-0 h-2 bg-[#e6c068]" />
          <div className="absolute inset-x-0 top-2 flex justify-around text-gold text-xs">
            {Array.from({ length: 8 }).map((_, i) => <span key={i}>♥</span>)}
          </div>
        </div>
        <div className="h-20 bg-gradient-to-b from-[#1f1438] to-[#0f0a1c] border-2 border-gold/40 rounded-b-xl relative">
          <div className="absolute inset-x-0 top-0 h-2 bg-[#e6c068]" />
        </div>
      </div>
      <p className="text-muted-foreground font-sans text-sm text-center">
        {allOut ? "🎉 Make a wish, Bhai!" : "Tap each candle to blow it out ✨"}
      </p>
    </div>
  );
}

// ------- Gift -------
function Gift({ message }: { message: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button onClick={() => { setOpen(o => !o); if (!open) confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } }); }}
      className="glass rounded-2xl p-6 flex flex-col items-center gap-3 hover:scale-105 transition-transform group">
      <div className="text-5xl group-hover:rotate-12 transition-transform">🎁</div>
      <div className={`text-sm font-sans text-center transition-all ${open ? "text-gold opacity-100 max-h-40" : "text-muted-foreground opacity-70 max-h-6 overflow-hidden"}`}>
        {open ? message : "Tap to open"}
      </div>
    </button>
  );
}

// ------- Main page -------
const memories = [m1, m2, m3, m4, m5, m6, m7, m8];

const shayaris = [
  "Bachpan se aaj tak,\ntu meri har dhadkan mein hai bhai. ❤️",
  "Tere kandhe pe chadh ke,\nmaine duniya dekhi hai. 🌍",
  "Meri har ladai mein dhal,\nmeri har khushi ka pal — tu hi tha. 🛡️",
  "Bhai nahi, tu meri pehli dosti hai,\nmeri sabse pyari yaadon ki kahani hai. 📖",
  "Tu aage chalta raha,\nmain tere kadmon ke nishaan dhundhta raha. 👣",
  "Maa ki daant se bachaya tune,\nPapa ke gusse mein dhal bana tu. 💛",
  "Chhota tha jab, ungli pakdi thi teri,\naaj bhi dil se wahi pakad hai meri. 🤝",
  "Bhagwan se maangi thi ek dua,\nMujhe mila tu — mera bhai, mera superhero. 🦸‍♂️",
];

function MemoryCard({ img, index, shayari, onOpen }: { img: string; index: number; shayari: string; onOpen: () => void }) {
  const [flipped, setFlipped] = useState(false);
  const tilt = (index % 2 === 0 ? -1 : 1) * (1 + (index % 3));
  return (
    <div className="group relative" style={{ perspective: "1200px", transform: `rotate(${tilt}deg)` }}>
      <div
        onClick={() => setFlipped(f => !f)}
        className="relative w-full aspect-[3/4] cursor-pointer transition-transform duration-700"
        style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* FRONT */}
        <div className="absolute inset-0 bg-white p-3 pb-10 shadow-2xl" style={{ backfaceVisibility: "hidden" }}>
          <div className="w-full h-[calc(100%-2rem)] overflow-hidden bg-navy-deep">
            <img src={img} alt={`Memory ${index + 1}`} loading="lazy" className="w-full h-full object-cover" />
          </div>
          <p className="absolute bottom-2 left-0 right-0 text-center font-script text-lg text-navy-deep">
            Bhai ❤️
          </p>
          <span className="absolute -top-2 -right-2 text-2xl opacity-0 group-hover:opacity-100 transition">✨</span>
          <span className="absolute top-2 right-2 text-[10px] uppercase tracking-widest text-navy-deep/50 font-sans">tap ↻</span>
        </div>
        {/* BACK */}
        <div
          className="absolute inset-0 rounded-sm p-5 flex flex-col items-center justify-center text-center shadow-2xl border border-gold/40"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(160deg, #0f0a1c 0%, #1a1138 60%, #2a1a4a 100%)",
          }}
        >
          <div className="text-gold/50 text-3xl font-display leading-none mb-2">"</div>
          <p className="font-display italic text-foreground/95 whitespace-pre-line text-sm md:text-base leading-relaxed">
            {shayari}
          </p>
          <div className="text-gold/50 text-3xl font-display leading-none mt-1 rotate-180">"</div>
          <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-gold/70 font-sans">— Tera Chhota Bhai</p>
          <button
            onClick={(e) => { e.stopPropagation(); onOpen(); }}
            className="mt-3 text-[11px] text-gold/80 hover:text-gold underline-offset-4 hover:underline font-sans"
          >
            View photo
          </button>
        </div>
      </div>
    </div>
  );
}

function BirthdayPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [wishes, setWishes] = useState<{ name: string; msg: string }[]>([]);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);
  // free soft instrumental loop (royalty-free) – using a simple chime tone hosted on a CDN as fallback
  const musicUrl = "https://cdn.pixabay.com/audio/2022/10/30/audio_347111d4f8.mp3"; // soft ambient

  const handleUnlock = () => {
    setUnlocked(true);
    setMusicOn(true);
    setTimeout(() => {
      confetti({ particleCount: 220, spread: 120, origin: { y: 0.3 }, colors: ["#e6c068", "#fff1c8", "#d8b04a", "#ffffff"] });
      confetti({ particleCount: 120, angle: 60, spread: 80, origin: { x: 0, y: 0.5 } });
      confetti({ particleCount: 120, angle: 120, spread: 80, origin: { x: 1, y: 0.5 } });
    }, 200);
  };

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.35;
    if (musicOn) audioRef.current.play().catch(() => {});
    else audioRef.current.pause();
  }, [musicOn]);

  // fireworks on scroll
  useEffect(() => {
    if (!unlocked) return;
    let last = 0;
    const onScroll = () => {
      const t = Date.now();
      if (t - last < 1800) return;
      last = t;
      confetti({ particleCount: 50, spread: 70, startVelocity: 35,
        origin: { x: Math.random(), y: Math.random() * 0.3 },
        colors: ["#e6c068", "#fff1c8", "#b48a2a"] });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [unlocked]);

  const submitWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !msg.trim()) return;
    setWishes(w => [{ name: name.trim(), msg: msg.trim() }, ...w]);
    setName(""); setMsg("");
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.7 } });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <FloatingAmbience />
      <audio ref={audioRef} src={musicUrl} loop />

      {!unlocked ? (
        <LockScreen onUnlock={handleUnlock} />
      ) : (
        <main className="relative z-10">
          {/* music toggle */}
          <button onClick={() => setMusicOn(m => !m)}
            className="fixed top-4 right-4 z-50 glass-strong rounded-full w-12 h-12 flex items-center justify-center shadow-gold hover:scale-110 transition"
            aria-label="Toggle music">
            <span className="text-xl">{musicOn ? "🔊" : "🔇"}</span>
          </button>

          {/* HERO */}
          <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center">
            <p className="font-script text-4xl md:text-6xl text-gradient-gold mb-2 animate-in fade-in duration-1000">
              🎉 Happy Birthday 🎉
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-semibold mb-10 leading-tight">
              <span className="text-foreground">Big </span>
              <span className="text-gradient-gold">Brother</span>
            </h1>

            {/* portrait */}
            <div className="relative mb-10">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-5xl md:text-6xl animate-crown z-10" style={{ filter: "drop-shadow(0 0 12px #e6c068)" }}>
                👑
              </div>
              <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full p-1.5 bg-gold animate-glow-pulse">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-navy-deep">
                  <img src={brotherMain.url} alt="My big brother" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            <div className="max-w-2xl glass rounded-2xl p-6 md:p-8 mb-10">
              <Typing text="Happy Birthday to the world's best brother."
                className="font-display text-xl md:text-2xl text-gold block mb-3" />
              <p className="font-body text-base md:text-lg text-foreground/90 leading-relaxed">
                Thank you for always protecting, guiding, and supporting me. May your life be filled with happiness, success, love, and endless smiles. You are not just my brother, you are my hero. <span className="text-gold">❤️</span>
              </p>
            </div>

            <Countdown />
            <p className="mt-3 text-xs uppercase tracking-[0.3em] text-muted-foreground font-sans">Until June 28 — Bhai's Big Day</p>
          </section>

          {/* SONG */}
          <section className="px-6 py-20 text-center">
            <h2 className="font-script text-4xl md:text-5xl text-gradient-gold mb-2">Bhai's Birthday Song</h2>
            <p className="font-sans text-sm uppercase tracking-[0.3em] text-muted-foreground mb-8">A little melody for you</p>
            <div className="max-w-md mx-auto glass-strong rounded-2xl p-6">
              <div className="text-5xl mb-3">🎵</div>
              <p className="font-display text-xl text-gold mb-4">Play Birthday Song for Bhai</p>
              <button onClick={() => setMusicOn(m => !m)}
                className="bg-gold text-primary-foreground font-sans font-semibold px-6 py-3 rounded-xl shadow-gold hover:scale-105 transition">
                {musicOn ? "⏸ Pause Music" : "▶ Play Music"}
              </button>
            </div>
          </section>

          {/* GALLERY */}
          <section className="px-6 py-20 max-w-6xl mx-auto">
            <h2 className="font-script text-4xl md:text-5xl text-gradient-gold text-center mb-2">Our Memories</h2>
            <p className="font-sans text-sm uppercase tracking-[0.3em] text-muted-foreground text-center mb-4">Moments to cherish forever</p>
            <p className="font-display italic text-lg md:text-xl text-foreground/85 text-center max-w-2xl mx-auto mb-12 leading-relaxed">
              From small bro to big bro — every frame holds a feeling words can't say. <span className="text-gold">❤️</span><br/>
              <span className="text-sm text-muted-foreground not-italic">You grew up holding my hand… today I hold these memories close to my heart.</span>
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {memories.map((img, i) => (
                <MemoryCard
                  key={i}
                  img={img.url}
                  index={i}
                  shayari={shayaris[i % shayaris.length]}
                  onOpen={() => setLightbox(img.url)}
                />
              ))}
            </div>
          </section>

          {/* SHAYARI */}
          <section className="px-6 py-20 max-w-5xl mx-auto">
            <h2 className="font-script text-4xl md:text-5xl text-gradient-gold text-center mb-12">Dil Se ❤️</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                "Har mushkil mein saath nibhaya hai,\nHar khushi mein muskuraya hai,\nDuniya ka sabse pyara rishta hai hamara,\nMere bade bhai ne hamesha mujhe sambhala hai. ❤️",
                "Rab se bas itni dua hai meri,\nHar din khushiyon se bhara rahe tera,\nJanamdin par mil jaye tujhe sab kuch,\nJo bhi sapna ho dil mein tera. 🎂",
              ].map((s, i) => (
                <div key={i} className="glass-strong rounded-2xl p-8 relative">
                  <span className="absolute top-3 left-4 text-5xl text-gold/40 font-display leading-none">"</span>
                  <p className="font-display text-lg md:text-xl text-foreground/95 italic whitespace-pre-line leading-relaxed pt-6">
                    {s}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* VIDEO */}
          <section className="px-6 py-20 max-w-4xl mx-auto">
            <h2 className="font-script text-4xl md:text-5xl text-gradient-gold text-center mb-2">Video Memories</h2>
            <p className="font-sans text-sm uppercase tracking-[0.3em] text-muted-foreground text-center mb-10">Press play to relive</p>
            <div className="glass-strong rounded-3xl p-3 shadow-gold animate-glow-pulse">
              <video src={memoryVideo.url} controls playsInline className="w-full rounded-2xl" />
            </div>
          </section>

          {/* CAKE */}
          <section className="px-6 py-20 text-center">
            <h2 className="font-script text-4xl md:text-5xl text-gradient-gold mb-2">Make a Wish</h2>
            <p className="font-sans text-sm uppercase tracking-[0.3em] text-muted-foreground mb-10">Blow out the candles 🎂</p>
            <Cake />
          </section>

          {/* GIFTS */}
          <section className="px-6 py-20 max-w-4xl mx-auto">
            <h2 className="font-script text-4xl md:text-5xl text-gradient-gold text-center mb-10">Little Surprises 🎁</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <Gift message="You're the strongest person I know 💪" />
              <Gift message="Thank you for every sacrifice ❤️" />
              <Gift message="Mom & Dad's pride, my hero 👑" />
              <Gift message="Wishing you endless success 🌟" />
              <Gift message="Forever grateful to have you 🙏" />
              <Gift message="Love you to the moon and back 🌙" />
            </div>
          </section>

          {/* SEND WISHES */}
          <section className="px-6 py-20 max-w-2xl mx-auto">
            <h2 className="font-script text-4xl md:text-5xl text-gradient-gold text-center mb-2">Send Wishes</h2>
            <p className="font-sans text-sm uppercase tracking-[0.3em] text-muted-foreground text-center mb-8">Leave a heartfelt note</p>
            <form onSubmit={submitWish} className="glass-strong rounded-2xl p-6 space-y-4">
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name"
                className="w-full bg-navy-deep/60 border border-gold/30 rounded-xl px-4 py-3 focus:outline-none focus:border-gold font-sans" />
              <textarea value={msg} onChange={e => setMsg(e.target.value)} placeholder="Your wish for Bhai..." rows={4}
                className="w-full bg-navy-deep/60 border border-gold/30 rounded-xl px-4 py-3 focus:outline-none focus:border-gold font-sans resize-none" />
              <button className="w-full bg-gold text-primary-foreground font-sans font-semibold py-3 rounded-xl shadow-gold hover:scale-[1.02] transition">
                Send Wish ❤️
              </button>
            </form>
            {wishes.length > 0 && (
              <div className="mt-8 space-y-4">
                {wishes.map((w, i) => (
                  <div key={i} className="glass rounded-xl p-5">
                    <p className="font-display text-gold text-lg">{w.name}</p>
                    <p className="font-body text-foreground/90 mt-1">{w.msg}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* FOOTER */}
          <footer className="px-6 py-16 text-center border-t border-gold/20 mt-10">
            <div className="text-3xl mb-3">❤️</div>
            <p className="font-script text-2xl md:text-3xl text-gradient-gold">
              Made with Love for My Big Brother
            </p>
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground mt-3">
              Happy Birthday Bhai
            </p>
          </footer>
        </main>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[100] bg-navy-deep/95 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-200">
          <img src={lightbox} alt="Memory" className="max-w-full max-h-full rounded-2xl shadow-gold" />
          <button className="absolute top-6 right-6 w-12 h-12 rounded-full glass-strong text-2xl">✕</button>
        </div>
      )}
    </div>
  );
}
