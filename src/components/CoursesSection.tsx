'use client';
import { COURSES } from "@/constants/courses";
import { CourseCard } from "./CourseCard";
import { Carousel } from "./Carousel";


export function CoursesSection() {
  return (
    <section id="courses" className="bg-course py-20 px-4 flex justify-center transition-colors">
      <div className="container">
        <h2 className="text-3xl font-extrabold text-foreground mb-2 text-center animate-fade-in">Cursos em destaque</h2>
        <p className="mb-10 text-center text-gray-foreground">Confira os cursos mais procurados pelos nossos alunos.</p>


        <div className="flex flex-row gap-4">

          <Carousel items={COURSES} renderItem={(course) => (
            <CourseCard
              title={course.title}
              description={course.description}
              isDragging={course.isDragging}
            />
          )}
            className="pt-4"
          />
        </div>
      </div>
    </section>
  )
}