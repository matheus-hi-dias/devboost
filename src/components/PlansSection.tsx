import { PLANS } from "@/constants";
import { PlanCard } from "./PlanCard";

export function PlansSection() {
  return (
    <section
      id="plans"
      aria-labelledby="plans-heading"
      tabIndex={-1}
      className="bg-background py-20 px-4 transition-colors"
    >
      <div className="container">
        <h2
          id="plans-heading"
          className="text-3xl font-extrabold text-foreground mb-2 text-center animate-fade-in "
        >
          Escolha o plano ideal para você
        </h2>
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6 w-full justify-items-center items-stretch">
          {PLANS.map(item => (
            <div key={item.id} className="flex justify-center">
              <PlanCard
                title={item.title}
                features={item.features}
                price={item.price}
                highlight={item.highlight}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
