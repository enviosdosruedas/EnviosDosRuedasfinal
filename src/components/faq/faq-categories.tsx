"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FaqItem } from "./faq-item"
import { Truck, DollarSign, Clock } from "lucide-react"

interface FaqData {
  category: string
  icon: React.ElementType
  questions: Array<{
    question: string
    answer: string
  }>
}

export function FaqCategories() {
  const [activeCategory, setActiveCategory] = useState("servicios")

  const faqData: FaqData[] = [
    {
      category: "servicios",
      icon: Truck,
      questions: [
        {
          question: "¿Qué tipo de envíos realizan?",
          answer:
            "Transportamos en moto: mandados, trámites, paquetes, delivery y servicios de cadetería.",
        },
        {
          question: "¿Cuáles son las zonas de cobertura? ¿Cubren toda la ciudad/región?",
          answer:
            "Cubrimos toda la ciudad, con la excepción de algunas zonas catalogadas como peligrosas por motivos de seguridad.",
        },
        {
          question: "¿Realizan entregas a Contrareembolso?",
          answer:
            "Sí, el efectivo cobrado será rendido en el transcurso del día o al día siguiente.",
        },
        {
          question: "¿Cuál es el tiempo estimado de entrega? ¿Ofrecen entregas?",
          answer:
            "No trabajamos con urgencias. Solicitamos una anticipación mínima de 2 horas para organizarnos y entregar todo en tiempo y forma. Según el tipo de envío, la entrega se realizará en el horario pactado.",
        },
        {
          question: "¿Cómo puedo solicitar un servicio de mensajería?",
          answer:
            "Comunícate por mensaje de WhatsApp al 2236602699 y un operador te responderá a la brevedad.",
        },
        {
          question: "¿Cuáles son sus horarios de atención/servicio?",
          answer:
            "Nuestro horario de atención es de lunes a viernes de 8 a 18 hs y sábados de 9 a 15 hs. Consulta por WhatsApp para el servicio de delivery nocturno.",
        },
        {
          question: "¿Trabajan con empresas o solo con particulares?",
          answer: "Atendemos empresas, emprendedores y particulares.",
        },
        {
          question: "¿Qué los diferencia de otros servicios de mensajería en moto?",
          answer:
            "Buscamos brindar un servicio de excelente calidad, donde la responsabilidad y la confianza son nuestros principales pilares.",
        },
      ],
    },
    {
      category: "precios",
      icon: DollarSign,
      questions: [
        {
          question: "¿Cómo calculan el costo del envío?",
          answer:
            "El costo de envío se calcula según la distancia entre el retiro y la entrega, y adicionales que puedan existir (bulto, lluvia, demora, distancia de retiro).",
        },
        {
          question: "¿Cuáles son las formas de pago que aceptan?",
          answer: "Se puede abonar en efectivo o por transferencia.",
        },
        {
          question: "¿Emiten factura?",
          answer: "Realizamos factura C.",
        },
        {
          question: "¿Ofrecen descuentos para emprendedores o clientes masivos?",
          answer: "Sí, ofrecemos planes especiales para emprendedores y clientes con muchos envíos.",
        },
      ],
    },
    {
      category: "proceso",
      icon: Clock,
      questions: [
        {
          question: "¿Qué información necesito proporcionar para solicitar un envío?",
          answer:
            "Para solicitar un envío necesitamos los siguientes datos: dirección de retiro, dirección de entrega, tamaño del envío, nombre y teléfono de quien recibe.",
        },
        {
          question: "¿Puedo modificar la dirección de entrega una vez que el envío está en curso?",
          answer:
            "Sí, pero dependiendo de la distancia, podría tener un costo adicional.",
        },
        {
          question: "¿Qué sucede si el destinatario no está presente en el momento de la entrega?",
          answer:
            "El envío será cobrado de igual manera, y se deberá reprogramar la entrega y abonar otro envío.",
        },
        {
          question: "¿Qué pasa si necesito cancelar un envío? ¿Hay algún cargo?",
          answer:
            "Depende del momento de la cancelación y a qué distancia de la entrega o el retiro se encuentre el cadete.",
        },
      ],
    },
  ]

  const categories = [
    { id: "servicios", label: "Servicios Generales", icon: Truck },
    { id: "precios", label: "Precios y Pagos", icon: DollarSign },
    { id: "proceso", label: "Proceso de Envío", icon: Clock },
  ]

  const activeFaq = faqData.find((faq) => faq.category === activeCategory)

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        {/* Category Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {categories.map((category) => {
            const IconComponent = category.icon
            const isActive = activeCategory === category.id

            return (
              <Button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                variant={isActive ? "default" : "outline"}
                className={`h-auto p-4 flex flex-col items-center space-y-2 transition-all duration-200 ${
                  isActive ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg scale-105" : "hover:bg-blue-50 hover:border-blue-300"
                }`}
              >
                <IconComponent className="w-6 h-6" />
                <span className="text-sm font-medium">{category.label}</span>
              </Button>
            )
          })}
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
            {categories.find((cat) => cat.id === activeCategory)?.label}
          </h2>

          {activeFaq?.questions.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} defaultOpen={index === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
