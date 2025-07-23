interface PlanCardProps {
  title: string;
  features: string[];
  price: number;
  highlight?: boolean;
}

function formatCurrency(v: number) {
  return v === 0
    ? "Grátis"
    : v.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        maximumFractionDigits: 0,
      });
}

export function PlanCard({ title, features, price, highlight }: PlanCardProps) {
  return (
    <div
      className={`flex flex-col justify-between rounded-2xl shadow-card w-full md:min-w-[320px] md:w-[320px] min-h-[340px] min-w-[340px] transition border px-7 py-8
        ${
          highlight
            ? "bg-gradient-to-br from-yellow-200 via-yellow-100 to-yellow-50 border-yellow-400 shadow-[0_0_40px_-10px_rgba(250,204,21,0.18)] scale-105"
            : "bg-card-normal border-muted"
        } animate-fade-in`}
      tabIndex={0}
      aria-label={`Plano ${title} - ${formatCurrency(price)}`}
    >
      <div>
        <h3
          className={`text-xl font-bold mb-4 ${
            highlight ? "text-yellow-700" : "text-primary"
          }`}
        >
          {title}
        </h3>
        <ul
          className={`space-y-2 mb-8 list-disc list-inside ${
            highlight ? "text-gray-700" : "text-muted-foreground"
          }`}
        >
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
      <span
        className={`text-3xl font-black ${
          highlight ? "text-yellow-800" : "text-secondary-foreground"
        }`}
      >
        {formatCurrency(price)}
      </span>
    </div>
  );
}
