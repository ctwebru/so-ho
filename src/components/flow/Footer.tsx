const Footer = () => {
  return (
    <footer className="bg-background py-16 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-forest flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-sm">F</span>
              </div>
              <span className="font-display font-semibold text-lg">Flow</span>
            </div>
            <p className="text-muted-foreground max-w-md">
              Lifestyle-пространство нового формата. Коворкинг, кофейня, соседский клуб.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Адрес</p>
            <p className="font-display">ул. Большая Зелёная, 12<br />Москва</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Связь</p>
            <p className="font-display">@flow_space<br />hello@flow.space</p>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 Flow Space</p>
          <p>Сделано с любовью к месту</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
