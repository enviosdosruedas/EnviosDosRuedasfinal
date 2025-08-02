"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TeamSection() {
  const teamMembers = [
    {
      name: "Matias Cejas",
      role: "Fundador y Director",
      image: "/redes/fac1.webp",
      quote: "Cada paquete es una promesa. Mi objetivo siempre fue construir una empresa en la que cada marplatense pueda confiar ciegamente.",
      linkedin: "#",
      twitter: "#",
    },
    // Future team members can be added here
  ];

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white font-heading mb-4">
            Conocé a Quienes Hacen Posible Tu Envío
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Somos un equipo de profesionales apasionados por la logística y, sobre todo, por nuestra ciudad.
          </p>
        </motion.div>

        <div className="flex justify-center">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="group relative w-full max-w-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="relative aspect-square">
                <Image
                  src={member.image}
                  alt={`Foto de ${member.name}`}
                  fill
                  className="object-cover rounded-3xl"
                  sizes="(max-width: 640px) 100vw, 384px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-3xl" />
              </div>
              <div className="relative bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl -mt-16 mx-4">
                <h3 className="text-2xl font-bold text-primary dark:text-white">{member.name}</h3>
                <p className="text-secondary font-semibold mb-4">{member.role}</p>
                <p className="text-muted-foreground italic mb-6">"{member.quote}"</p>
                <div className="flex justify-center gap-4">
                  <Button asChild variant="outline" size="icon" className="rounded-full">
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="icon" className="rounded-full">
                    <a href={member.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                      <Twitter className="w-5 h-5" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
