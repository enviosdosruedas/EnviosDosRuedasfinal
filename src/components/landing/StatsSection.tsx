import { PackageCheck, Smile, Clock, Users } from "lucide-react";

export function StatsSection() {
  const stats = [
    {
      icon: <PackageCheck className="w-10 h-10" />,
      value: "5,000+",
      label: "Envíos Realizados",
    },
    {
      icon: <Smile className="w-10 h-10" />,
      value: "1,200+",
      label: "Clientes Satisfechos",
    },
    {
      icon: <Clock className="w-10 h-10" />,
      value: "99%",
      label: "Entregas a Tiempo",
    },
    {
      icon: <Users className="w-10 h-10" />,
      value: "50+",
      label: "Negocios Aliados",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              {stat.icon}
              <p className="text-4xl md:text-5xl font-bold tracking-tighter">{stat.value}</p>
              <p className="text-sm text-primary-foreground/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
