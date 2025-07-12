type Course = {
  title: string;
  description: string;
  isDragging?: boolean;
};
export const COURSES: Course[] = [
  {
    title: "Desenvolvimento Full Stack",
    description: "Domine front-end e back-end com projetos práticos em Node.js e React.",
  },
  {
    title: "Landing Pages com Tailwind",
    description: "Crie interfaces incríveis e responsivas com Tailwind CSS.",
  },
  {
    title: "APIs REST & GraphQL",
    description: "Projetando e consumindo APIs robustas e seguras para web."
  },
  {
    title: "React do Zero ao Avançado",
    description: "Construa aplicações modernas com React, hooks, contextos e testes."
  }
]