const Manifesto = () => {
  return (
    <section className="py-24 md:py-40 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_50%,hsl(var(--highlight)/0.4),transparent_50%)]" />
      <div className="container mx-auto px-6 relative">
        <p className="text-xs uppercase tracking-widest text-highlight mb-8">/ Манифест</p>
        <p className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.15] font-medium text-balance max-w-5xl">
          Мы верим, что <em className="italic font-normal text-highlight">место</em> меняет работу.
          Что хороший кофе важен. Что соседи — это не случайность,
          а <em className="italic font-normal text-highlight">сообщество</em>.
          И что приходить сюда должно быть легко — как открыть дверь дома.
        </p>
        <div className="mt-12 flex items-center gap-4">
          <div className="h-px flex-1 bg-primary-foreground/20" />
          <span className="text-xs uppercase tracking-widest text-primary-foreground/60">Команда SO-HO!</span>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
