
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Twitter, Youtube, Mail } from "lucide-react"
import Image from "next/image"

export function SocialConnect() {
  const socialNetworks = [
    {
      name: "Facebook",
      icon: Facebook,
      handle: "@enviosdosruedas",
      description: "Síguenos para ofertas exclusivas y actualizaciones diarias.",
      color: "bg-blue-600 hover:bg-blue-700",
      url: "https://facebook.com/enviosdosruedas",
      followers: "2.5K+", // Example
    },
    {
      name: "Instagram",
      icon: Instagram,
      handle: "@enviosdosruedas",
      description: "Fotos de nuestros servicios y promociones especiales.",
      color: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
      url: "https://instagram.com/enviosdosruedas",
      followers: "3.2K+", // Example
    },
    {
      name: "WhatsApp",
      icon: null,
      handle: "+54 9 223 660-2699",
      description: "Contacto directo para consultas y pedidos.",
      color: "bg-green-500 hover:bg-green-600",
      url: "https://wa.me/5492236602699?text=Hola%20Envios%20DosRuedas,%20tengo%20una%20consulta.",
      followers: "Directo",
    },
  ]

  return (
    <section className="py-16 px-4 bg-gray-50 font-sans">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4 font-display">¡Conéctate con nosotros!</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Sigue nuestras redes sociales para acceder a promociones exclusivas, actualizaciones y más.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {socialNetworks.map((network) => {
            const IconComponent = network.icon
            return (
              <Card key={network.name} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col">
                <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${network.color} flex-shrink-0`}>
                      {IconComponent ? (
                        <IconComponent className="w-6 h-6 text-white" />
                      ) : (
                        <Image src="/icon/icon-whatsapp.svg" alt="WhatsApp" width={24} height={24} className="w-6 h-6" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 font-display">{network.name}</h3>
                      <p className="text-sm text-gray-500">{network.followers} {network.name !== "WhatsApp" && network.name !== "Email" ? "seguidores" : ""}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed flex-grow">{network.description}</p>

                  <div className="mt-auto">
                    <Button asChild size="sm" className={`w-full text-white ${network.color} border-0`}>
                      <a href={network.url} target="_blank" rel="noopener noreferrer">
                        {network.name === "WhatsApp" ? "Chatear Ahora" : network.name === "Email" ? "Enviar Email" : `Seguir en ${network.name}`}
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
