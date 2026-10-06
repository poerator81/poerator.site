export function HeroVideo() {
  return (
    <div className="hero-video pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <video
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/video/hero-poster.jpg"
      >
        <source src="/video/hero-loop.webm" type="video/webm" />
        <source src="/video/hero-loop.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-legal-black/70 via-legal-black/60 to-legal-black" />
    </div>
  );
}
