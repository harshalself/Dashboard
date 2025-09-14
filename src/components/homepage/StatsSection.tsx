export function StatsSection() {
  return (
    <section
      id="stats"
      className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto text-center">
        <div>
          <div className="text-4xl font-bold text-primary mb-2">100+</div>
          <div className="text-muted-foreground">Components</div>
        </div>
        <div>
          <div className="text-4xl font-bold text-primary mb-2">TypeScript</div>
          <div className="text-muted-foreground">Type Safe</div>
        </div>
        <div>
          <div className="text-4xl font-bold text-primary mb-2">MIT</div>
          <div className="text-muted-foreground">License</div>
        </div>
      </div>
    </section>
  );
}
