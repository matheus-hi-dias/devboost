import { BookOpenIcon } from "@heroicons/react/24/outline";

interface CourseCardProps {
  title: string;
  description: string;
  isDragging?: boolean;
}
export function CourseCard({ title, description, isDragging }: CourseCardProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-card flex flex-col p-6 justify-between h-[260px] w-[260px] transition hover:shadow-lg border ${isDragging ? 'cursor-grabbing' : 'cursor-pointer'} animate-fade-in focus-within:ring-2 focus-within:ring-primary`}>
      <div className="flex items-center gap-3 mb-4">
        <span className="bg-[hsl(var(--primary)/0.1)] text-primary rounded-full p-2 flex-shrink-0">
          <BookOpenIcon className="w-8 h-8" aria-hidden="true"
          />
        </span>
        <h3 className="text-lg font-semibold text-gray-900 leading-tight">{title}</h3>
      </div>
      <p className="text-gray-600 flex-1 text-sm">{description}</p>
      <a href="#contato" className="mt-4 inline-block rounded-md bg-[hsl(var(--primary)/0.9)]  text-white text-sm px-5 py-2 font-medium shadow hover:bg-primary focus-visible:ring-2 focus-visible:ring-primary transition">Saiba mais</a>
    </div >
  );
}