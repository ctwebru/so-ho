import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-background py-16 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="mb-4">
              <Logo size="lg" />
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent mb-3">Coffee. Work. Meet.</p>
            <p className="text-muted-foreground max-w-md">
              Lifestyle-пространство нового формата. Кофейня, коворкинг, соседский клуб.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Адрес</p>
            <p className="font-display">ул. Большая Зелёная, 12<br />Москва</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Связь</p>
            <p className="font-display">@so_ho_space<br />hello@so-ho.space</p>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 SO-HO!</p>
          <p>Сделано с любовью к месту</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
