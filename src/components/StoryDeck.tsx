import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { birthdayConfig as config } from "../data";
import { Bear, Bunny, Cake, Cloud, FlowerPatch, Rainbow } from "./CuteIllustrations";

const slideNames = ["开场", "时光线", "喜欢", "时光", "给你的信", "生日快乐"];

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
  const [cakeStage, setCakeStage] = useState<"ready" | "lit" | "wish" | "party">("ready");
  const [memoryIndex, setMemoryIndex] = useState(0);
  const currentRef = useRef(getInitialPage());
  const memoryIndexRef = useRef(0);
  const wheelLocked = useRef(false);
  const wheelRelease = useRef<number | null>(null);
  const touchStart = useRef(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => { currentRef.current = current; }, [current]);
  useEffect(() => { memoryIndexRef.current = memoryIndex; }, [memoryIndex]);

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
    if (!config.musicSrc || !audioRef.current) return;
    if (musicPlaying) audioRef.current.play().catch(() => setMusicPlaying(false));
    else audioRef.current.pause();
  }, [musicPlaying]);

  const handleStart = () => {
    if (config.musicSrc) setMusicPlaying(true);
    memoryIndexRef.current = 0;
    setMemoryIndex(0);
    goTo(1);
  };

  const advanceCake = () => {
    setCakeStage((stage) => stage === "ready" ? "lit" : stage === "lit" ? "wish" : "party");
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
        <button className="music-pill" type="button" onClick={() => config.musicSrc && setMusicPlaying((value) => !value)} title={config.musicSrc ? "播放或暂停音乐" : "在 src/data.ts 添加背景音乐"}>
          <span className={musicPlaying ? "music-bounce" : ""}>♪</span>{config.musicSrc ? (musicPlaying ? "音乐播放中" : "播放音乐") : "等待一首歌"}
        </button>
        {config.musicSrc && <audio ref={audioRef} src={config.musicSrc} loop preload="metadata" />}
      </header>

      <section className={`${slideClass(0)} hero-slide`} aria-hidden={current !== 0}>
        <Cloud className="cloud cloud-a" />
        <Cloud className="cloud cloud-b" />
        <Rainbow className="hero-rainbow" />
        <div className="sunshine" aria-hidden="true"><span>♡</span></div>
        <div className="hero-copy">
          <span className="sticker-label">FOR MY FAVORITE GIRL</span>
          <h1>与你有关的<br /><em>甜甜时光</em></h1>
          <p>嗨，小寿星！<br />今天这片草地，只为你开花。</p>
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
                <span className="timeline-chapter">{memory.chapter}</span>
                <time>{memory.date}</time>
                <h3>{memory.title}</h3>
                <p>{memory.text}</p>
                <blockquote>“{memory.quote}”</blockquote>
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
          <div className="stat-balloon balloon-pink"><strong>{Number.isFinite(days) ? days : "—"}</strong><span>相识的日夜</span><i /></div>
          <div className="stat-balloon balloon-yellow"><strong>{config.stats.photoCount.toLocaleString()}</strong><span>一起拍的照片</span><i /></div>
          <div className="stat-balloon balloon-mint"><strong>{config.stats.places}</strong><span>一起去的地方</span><i /></div>
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
          <p className="tiny-en">A LETTER JUST FOR YOU</p>
          <h2>写给 {config.herName}</h2>
          <div className="cute-letter-body">
            <p>{config.herName}：</p>
            {config.letter.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <footer><strong>生日快乐！</strong><span>爱你的我 · 2026</span></footer>
        </article>
      </section>

      <section className={`${slideClass(5)} party-slide ${cakeStage === "party" ? "is-party" : ""}`} aria-hidden={current !== 5}>
        <div className="confetti" aria-hidden="true">
          {Array.from({ length: 84 }, (_, index) => (
            <i key={index} style={{
              "--x": `${(index * 37) % 101}%`,
              "--delay": `${-((index * 0.073) % 3.4)}s`,
              "--duration": `${2.5 + (index % 7) * 0.18}s`,
              "--drift": `${(index % 2 ? 1 : -1) * (24 + (index % 5) * 13)}px`,
            } as CSSProperties} />
          ))}
        </div>
        <div className="celebration-bursts" aria-hidden="true">{Array.from({ length: 7 }, (_, index) => <i key={index} />)}</div>
        <div className="party-ribbons" aria-hidden="true">{Array.from({ length: 10 }, (_, index) => <i key={index} />)}</div>
        <div className="party-copy">
          <span className="sticker-label">HAPPY BIRTHDAY!</span>
          <h2>生日快乐，<br /><em>{config.herName}</em></h2>
          <p>{cakeStage === "wish" ? "闭上眼睛，认真许一个愿望吧。" : cakeStage === "party" ? "好啦！愿望已经寄到星星那里啦！" : "愿新的一岁，有好多好多小幸运。"}</p>
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
        <button className="replay-cute" type="button" onClick={() => { setCakeStage("ready"); goTo(0); }}>↺ 再看一遍</button>
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
