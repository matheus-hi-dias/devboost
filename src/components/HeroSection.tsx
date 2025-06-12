import Image from "next/image";

export function HeroSection() {
  return (
    <section
      id="home"
      className="pt-32 pb-20 px-4 md:px-0 bg-gradient-to-bl from-[hsl(var(--primary))/0.1] via-[hsl(var(--background))/0.8] to-[hsl(var(--muted))] flex flex-col md:flex-row items-center gap-10 min-h-[66vh] container animate-fade-in"
      aria-label="Seção principal"
    >
      <div className="flex-1 text-center md:text-left max-w-lg">
        <h1 className="text-4xl md:text-5xl font-black text-primary mb-5 leading-tight">
          Acelere sua carreira como{" "}
          <span className="text-secondary">Desenvolvedor(a)</span>
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Cursos práticos, trilhas guiadas e projetos reais para você dominar o desenvolvimento web.
        </p>
        <a
          href="#cursos"
          className="inline-block rounded-lg bg-primary text-primary-foreground font-semibold text-base px-7 py-3 shadow-card hover:bg-primary/90 focus:ring-2 focus:ring-offset-2 focus:ring-primary transition"
        >
          Comece agora
        </a>
      </div>
      <div className="flex-1 flex justify-center">
        <Image
          src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=400&q=80"
          alt="Ilustração desenvolvedor programando"
          className="rounded-xl shadow-lg max-h-[410px] w-full object-cover"
          width={360}
          height={410}
          loading="lazy"
        />
      </div>
    </section>
  );
}