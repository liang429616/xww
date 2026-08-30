import { useCallback, useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { birthdayConfig as config } from "../data";
import { Bear, Bunny, Cake, Cloud, FlowerPatch, Rainbow } from "./CuteIllustrations";

const slideNames = ["开场", "时光线", "喜欢", "时光", "给你的信", "生日快乐"];
const heartConfetti = confetti.shapeFromText({ text: "💗", scalar: 2 });

function getInitialPage() {
  const requested = Number(new URLSearchParams(window.location.search).get("page"));
  return Number.isInteger(requested) && requested >= 1 && requested <= slideNames.length ? requested - 1 : 0;
}

function PhotoCard({ src, label, className = "" }: { src?: string; label: string; className?: string }) {
  return (
    <figure className={`cute-photo ${className}`}>
      {src ? <img src={src} alt={label} /> : (
        <div className="cute-photo-placeholder">
          <span>♡</span>
          <strong>把我们的照片<br />放在这里</strong>
        </div>
      )}
      <figcaption>{label}</figcaption>
      <i className="photo-tape" />
    </figure>
  );
}

export function StoryDeck() {
  const [current, setCurrent] = useState(getInitialPage);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [cakeStage, setCakeStage] = useState<"ready" | "lit" | "wish" | "party">("ready");
  const [memoryIndex, setMemoryIndex] = useState(0);
  const [letterPassword, setLetterPassword] = useState("");
  const [letterUnlocked, setLetterUnlocked] = useState(false);
  const [letterPasswordError, setLetterPasswordError] = useState(false);
  const currentRef = useRef(getInitialPage());
  const memoryIndexRef = useRef(0);
  const wheelLocked = useRef(false);
  const wheelRelease = useRef<number | null>(null);
  const celebrationFrame = useRef<number | null>(null);
  const celebrationTimers = useRef<number[]>([]);
  const touchStart = useRef(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const musicTracks = config.musicPlaylist;
  const hasMusic = musicTracks.length > 0;

  useEffect(() => { currentRef.current = current; }, [current]);
  useEffect(() => { memoryIndexRef.current = memoryIndex; }, [memoryIndex]);

  const stopCelebration = useCallback(() => {
    if (celebrationFrame.current !== null) {
      window.cancelAnimationFrame(celebrationFrame.current);
      celebrationFrame.current = null;
    }
    celebrationTimers.current.forEach((timer) => window.clearTimeout(timer));
    celebrationTimers.current = [];
    confetti.reset();
  }, []);

  useEffect(() => stopCelebration, [stopCelebration]);

  const goTo = useCallback((index: number) => {
    const next = Math.max(0, Math.min(slideNames.length - 1, index));
    setCurrent(next);
  }, []);

  const turnPage = useCallback((direction: number) => {
    const page = currentRef.current;
    if (page === 1) {
      const nextMemory = memoryIndexRef.current + direction;
      if (nextMemory >= 0 && nextMemory < config.memories.length) {
        memoryIndexRef.current = nextMemory;
        setMemoryIndex(nextMemory);
        return;
      }
    }
    goTo(page + direction);
  }, [goTo]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (Math.abs(event.deltaY) < 8) return;
      if (wheelLocked.current) {
        if (wheelRelease.current) window.clearTimeout(wheelRelease.current);
        wheelRelease.current = window.setTimeout(() => { wheelLocked.current = false; }, 260);
        return;
      }
      wheelLocked.current = true;
      turnPage(event.deltaY > 0 ? 1 : -1);
      wheelRelease.current = window.setTimeout(() => { wheelLocked.current = false; }, 720);
    };
    const handleKey = (event: KeyboardEvent) => {
      if (["ArrowDown", "ArrowRight", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        turnPage(1);
      }
      if (["ArrowUp", "ArrowLeft", "PageUp"].includes(event.key)) {
        event.preventDefault();
        turnPage(-1);
      }
      if (event.key === "Home") goTo(0);
      if (event.key === "End") goTo(slideNames.length - 1);
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKey);
      if (wheelRelease.current) window.clearTimeout(wheelRelease.current);
    };
  }, [goTo, turnPage]);

  useEffect(() => {
    if (!hasMusic || !audioRef.current) return;
    if (musicPlaying) audioRef.current.play().catch(() => setMusicPlaying(false));
    else audioRef.current.pause();
  }, [hasMusic, musicPlaying, trackIndex]);

  const handleStart = () => {
    if (hasMusic) {
      audioRef.current?.play().then(() => setMusicPlaying(true)).catch(() => setMusicPlaying(false));
    }
    memoryIndexRef.current = 0;
    setMemoryIndex(0);
    goTo(1);
  };

  const toggleMusic = () => {
    if (!hasMusic || !audioRef.current) return;
    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
      return;
    }
    audioRef.current.play().then(() => setMusicPlaying(true)).catch(() => setMusicPlaying(false));
  };

  const unlockLetter = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (letterPassword === "251225") {
      setLetterUnlocked(true);
      setLetterPasswordError(false);
      return;
    }
    setLetterPasswordError(true);
  };

  const playNextTrack = () => {
    setTrackIndex((index) => (index + 1) % musicTracks.length);
  };

  const fireCelebration = useCallback(() => {
    stopCelebration();
    const colors = ["#f493a4", "#ffd66f", "#8bcdb2", "#9fd4ef", "#bba7df", "#fff5dc"];
    const shared = {
      colors,
      disableForReducedMotion: true,
      zIndex: 80,
    };

    // 蛋糕上方的主礼花：先集中喷出，再自然散落。
    void confetti({
      ...shared,
      particleCount: 145,
      spread: 118,
      startVelocity: 56,
      decay: 0.91,
      gravity: 0.92,
      ticks: 260,
      origin: { x: 0.66, y: 0.61 },
      shapes: ["circle", "square", "star"],
      scalar: 1.05,
    });

    // 稍后从顶部落下一层较轻的彩纸，增加纵深感。
    celebrationTimers.current.push(window.setTimeout(() => {
      void confetti({
        ...shared,
        particleCount: 125,
        spread: 170,
        startVelocity: 24,
        decay: 0.94,
        gravity: 0.62,
        ticks: 340,
        origin: { x: 0.55, y: 0.02 },
        shapes: ["circle", "square"],
        scalar: 0.86,
      });
    }, 280));

    // 心形和星星给“愿望送达”一个清晰的收尾。
    celebrationTimers.current.push(window.setTimeout(() => {
      void confetti({
        ...shared,
        particleCount: 58,
        spread: 360,
        startVelocity: 34,
        decay: 0.92,
        gravity: 0.35,
        ticks: 210,
        origin: { x: 0.67, y: 0.46 },
        shapes: ["star"],
        scalar: 1.15,
      });
      void confetti({
        ...shared,
        particleCount: 18,
        spread: 115,
        startVelocity: 29,
        gravity: 0.55,
        ticks: 230,
        origin: { x: 0.67, y: 0.48 },
        shapes: [heartConfetti],
        scalar: 1.35,
      });
    }, 820));

    // 持续庆祝：礼炮、随机烟花和顶部闪片分层循环，离开页面时才停止。
    let lastSideAt = 0;
    let lastFireworkAt = 0;
    let lastShowerAt = 0;
    let fireworkCount = 0;
    const celebrateForever = (now: number) => {
      if (now - lastSideAt > 520) {
        lastSideAt = now;
        void confetti({
          ...shared,
          particleCount: 8,
          angle: 58,
          spread: 54,
          startVelocity: 44,
          gravity: 0.86,
          ticks: 250,
          origin: { x: 0.02, y: 0.78 },
        });
        void confetti({
          ...shared,
          particleCount: 8,
          angle: 122,
          spread: 54,
          startVelocity: 44,
          gravity: 0.86,
          ticks: 250,
          origin: { x: 0.98, y: 0.78 },
        });
      }

      if (now - lastFireworkAt > 1450) {
        lastFireworkAt = now;
        fireworkCount += 1;
        const origin = { x: 0.16 + Math.random() * 0.7, y: 0.16 + Math.random() * 0.34 };
        void confetti({
          ...shared,
          particleCount: 44,
          spread: 360,
          startVelocity: 31,
          decay: 0.92,
          gravity: 0.38,
          ticks: 220,
          origin,
          shapes: ["star", "circle"],
          scalar: 1.05,
        });
        if (fireworkCount % 3 === 0) {
          void confetti({
            ...shared,
            particleCount: 10,
            spread: 150,
            startVelocity: 25,
            gravity: 0.48,
            ticks: 220,
            origin,
            shapes: [heartConfetti],
            scalar: 1.2,
          });
        }
      }

      if (now - lastShowerAt > 760) {
        lastShowerAt = now;
        void confetti({
          ...shared,
          particleCount: 9,
          spread: 80,
          startVelocity: 7,
          decay: 0.96,
          gravity: 0.45,
          ticks: 360,
          origin: { x: Math.random(), y: -0.03 },
          shapes: ["circle", "square"],
          scalar: 0.72,
        });
      }

      celebrationFrame.current = window.requestAnimationFrame(celebrateForever);
    };
    celebrationFrame.current = window.requestAnimationFrame(celebrateForever);
  }, [stopCelebration]);

  useEffect(() => {
    if (current === slideNames.length - 1 && cakeStage === "party") fireCelebration();
    else stopCelebration();
  }, [cakeStage, current, fireCelebration, stopCelebration]);

  const advanceCake = () => {
    if (cakeStage === "ready") setCakeStage("lit");
    else if (cakeStage === "lit") setCakeStage("wish");
    else if (cakeStage === "wish") {
      setCakeStage("party");
    }
  };

  const slideClass = (index: number) => {
    if (index === current) return "story-slide is-current";
    if (index < current) return "story-slide is-before";
    return "story-slide is-after";
  };

  const days = Math.max(1, Math.floor((Date.now() - new Date(`${config.relationshipStart}T00:00:00`).getTime()) / 86400000));

  return (
    <main
      className="story-deck"
      onTouchStart={(event) => { touchStart.current = event.touches[0].clientY; }}
      onTouchEnd={(event) => {
        const distance = touchStart.current - event.changedTouches[0].clientY;
        if (Math.abs(distance) > 55) turnPage(distance > 0 ? 1 : -1);
      }}
    >
      <header className="deck-header">
        <button className="deck-brand" onClick={() => goTo(0)} type="button"><span>♡</span> 与你有关的甜甜时光</button>
        <div className="deck-progress"><i style={{ width: `${((current + 1) / slideNames.length) * 100}%` }} /></div>
        <button className="music-pill" type="button" onClick={toggleMusic} title={hasMusic ? "播放或暂停音乐" : "在 src/data.ts 添加背景音乐"}>
          <span className={musicPlaying ? "music-bounce" : ""}>♪</span>{hasMusic ? (musicPlaying ? `音乐 ${trackIndex + 1}/${musicTracks.length}` : "播放音乐") : "等待一首歌"}
        </button>
        {hasMusic && <audio ref={audioRef} src={musicTracks[trackIndex]} onEnded={playNextTrack} onError={playNextTrack} preload="metadata" />}
      </header>

      <section className={`${slideClass(0)} hero-slide`} aria-hidden={current !== 0}>
        <Cloud className="cloud cloud-a" />
        <Cloud className="cloud cloud-b" />
        <Rainbow className="hero-rainbow" />
        <div className="sunshine" aria-hidden="true"><span>♡</span></div>
        <div className="hero-copy">
          <span className="sticker-label">FOR MY GIRL</span>
          <h1>与你有关的<br /><em>甜甜时光</em></h1>
          <p>嗨，小寿星！<br />这是我送给小文文的礼物</p>
          <button className="candy-button" type="button" onClick={handleStart}>打开生日绘本 <span>→</span></button>
        </div>
        <div className="hero-characters">
          <Bunny className="hero-bunny" />
          <Bear className="hero-bear" />
          <div className="gift gift-one"><i /><span /></div>
          <div className="gift gift-two"><i /><span /></div>
        </div>
        <div className="meadow meadow-back" />
        <div className="meadow meadow-front" />
        <FlowerPatch className="hero-flowers" />
        <span className="doodle-heart heart-a">♡</span>
        <span className="doodle-heart heart-b">♡</span>
      </section>

      <section className={`${slideClass(1)} timeline-cute-slide`} aria-hidden={current !== 1}>
        <div className="slide-kicker"><span>01</span> 我们的时光线</div>
        <div className="timeline-cute-heading">
          <p className="tiny-en">SWEET LITTLE MOMENTS</p>
          <h2>一张一张，<br /><em>慢慢翻回那天</em></h2>
        </div>
        <div className="timeline-stage">
          {config.memories.map((memory, index) => (
            <article
              className={`timeline-memory ${index === memoryIndex ? "is-active" : index < memoryIndex ? "is-past" : "is-future"}`}
              key={memory.title}
              aria-hidden={index !== memoryIndex}
            >
              <div className="timeline-photo-wrap">
                <PhotoCard src={memory.photos?.[0]} label={memory.title} />
                <span className="timeline-photo-number">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="timeline-memory-copy">
                <time>{memory.date}</time>
                <h3>{memory.title}</h3>
                <p>{memory.text}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="timeline-stepper" aria-label="时间线照片导航">
          {config.memories.map((memory, index) => (
            <button className={index === memoryIndex ? "is-active" : ""} type="button" key={memory.title} onClick={() => { memoryIndexRef.current = index; setMemoryIndex(index); }}>
              <i /><span>{memory.date}</span>
            </button>
          ))}
        </div>
        <p className="timeline-hint">滚动一次 · 看下一张回忆 <span>→</span></p>
        <Bunny className="timeline-bunny" />
        <Bear className="timeline-bear" />
      </section>

      <section className={`${slideClass(2)} reasons-slide`} aria-hidden={current !== 2}>
        <div className="slide-kicker"><span>02</span> 小小喜欢清单</div>
        <div className="reasons-heading">
          <p className="tiny-en">WHY I LIKE YOU</p>
          <h2>你有好多好多<br /><em>让我心动的小细节</em></h2>
          <p>点击卡片，可以偷偷看背面。</p>
        </div>
        <div className="cute-reason-grid">
          {config.reasons.slice(0, 6).map(([number, title, detail]) => (
            <button className="cute-reason" type="button" key={number} onClick={(event) => event.currentTarget.classList.toggle("is-open")}>
              <span className="reason-face"><b>{number}</b><strong>{title}</strong><i>点我 ♡</i></span>
              <span className="reason-detail">{detail}<i>再点一下</i></span>
            </button>
          ))}
        </div>
        <Bunny className="reasons-bunny" />
        <div className="pink-blob" />
      </section>

      <section className={`${slideClass(3)} numbers-slide`} aria-hidden={current !== 3}>
        <Cloud className="numbers-cloud-a" />
        <Cloud className="numbers-cloud-b" />
        <Rainbow className="numbers-rainbow" />
        <div className="slide-kicker"><span>03</span> 一点点时光证据</div>
        <div className="numbers-copy">
          <p className="tiny-en">OUR TIME IN NUMBERS</p>
          <h2>原来我们已经<br />一起走了<em>这么久</em></h2>
          <p>数字只能数出时间，却数不完喜欢。</p>
        </div>
        <div className="balloon-stats">
          <div className="stat-balloon balloon-pink"><strong>{config.stats.days}</strong><span>相识的日夜</span><i /></div>
          <div className="stat-balloon balloon-yellow"><strong>{config.stats.meals}</strong><span>一起吃过的饭</span><i /></div>
          <div className="stat-balloon balloon-mint"><strong>{config.stats.dances}</strong><span>一起跳过的舞</span><i /></div>
          <div className="stat-balloon balloon-blue"><strong>∞</strong><span>还没写完的故事</span><i /></div>
        </div>
        <div className="numbers-grass" />
        <Bear className="numbers-bear" />
        <FlowerPatch className="numbers-flowers" />
      </section>

      <section className={`${slideClass(4)} letter-cute-slide`} aria-hidden={current !== 4}>
        <div className="slide-kicker"><span>04</span> 请查收一封信</div>
        <div className="mail-scene">
          <div className="mailbox"><i /><strong>LOVE<br />MAIL</strong><span>♡</span></div>
          <Bunny className="mail-bunny" />
          <FlowerPatch className="mail-flowers" />
        </div>
        <article className="cute-letter">
          <span className="letter-pin">♡</span>
          {letterUnlocked ? <>
            <p className="tiny-en">A LETTER JUST FOR YOU</p>
            <h2>写给 {config.herName}</h2>
            <div className="cute-letter-body">
              <p>{config.herName}：</p>
              {config.letter.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <footer><strong>生日快乐！</strong><span>爱你的我 · 2026</span></footer>
          </> : <div className="letter-lock">
            <span className="letter-lock-icon" aria-hidden="true">🔒</span>
            <p className="tiny-en">A SECRET LETTER FOR YOU</p>
            <h2>输入六位密码<br />打开这封信</h2>
            <form onSubmit={unlockLetter}>
              <input
                aria-label="六位密码"
                autoComplete="off"
                inputMode="numeric"
                maxLength={6}
                pattern="[0-9]{6}"
                placeholder="○ ○ ○ ○ ○ ○"
                type="password"
                value={letterPassword}
                onChange={(event) => { setLetterPassword(event.target.value.replace(/\D/g, "")); setLetterPasswordError(false); }}
              />
              <button type="submit">打开信件 ♡</button>
            </form>
            {letterPasswordError && <p className="letter-password-error">密码不对哦，再想想看 ♡</p>}
          </div>}
        </article>
      </section>

      <section className={`${slideClass(5)} party-slide`} aria-hidden={current !== 5}>
        <div className="party-copy">
          <span className="sticker-label">HAPPY BIRTHDAY!</span>
          <h2><em>{config.herName}</em><br />{'    '}生日快乐!</h2>
          <p>{cakeStage === "wish" ? "闭上眼睛，认真许一个愿望吧。" : cakeStage === "party" ? "好啦！愿望已经寄到星星那里啦！" : "新的一岁，也要开开心心！"}</p>
          <button className="candy-button" type="button" onClick={advanceCake} disabled={cakeStage === "party"}>
            {cakeStage === "ready" ? "点亮蜡烛" : cakeStage === "lit" ? "我要许愿" : cakeStage === "wish" ? "呼——吹蜡烛" : "愿望已送达 ♡"}
          </button>
        </div>
        <div className="party-scene">
          <Cake className="party-cake" candlesLit={cakeStage === "lit" || cakeStage === "wish"} />
          <Bunny className="party-bunny" />
          <Bear className="party-bear" />
          <div className="party-balloons"><i /><i /><i /><span /></div>
        </div>
        <button className="replay-cute" type="button" onClick={() => { stopCelebration(); setCakeStage("ready"); goTo(0); }}>↺ 再看一遍</button>
      </section>

      <nav className="deck-nav" aria-label="绘本页码">
        {slideNames.map((name, index) => (
          <button className={index === current ? "is-active" : ""} type="button" key={name} onClick={() => goTo(index)} title={name}>
            <span>{String(index + 1).padStart(2, "0")}</span><i />
          </button>
        ))}
      </nav>

      <div className="deck-controls">
        <button type="button" onClick={() => turnPage(-1)} disabled={current === 0} aria-label="上一页">←</button>
        <span>{String(current + 1).padStart(2, "0")} / {String(slideNames.length).padStart(2, "0")} · {slideNames[current]}{current === 1 ? ` ${memoryIndex + 1}/${config.memories.length}` : ""}</span>
        <button type="button" onClick={() => turnPage(1)} disabled={current === slideNames.length - 1} aria-label="下一页">→</button>
      </div>
      <p className="wheel-tip">滚动鼠标 · 翻到下一页</p>
    </main>
  );
}
