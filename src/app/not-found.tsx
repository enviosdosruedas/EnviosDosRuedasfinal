import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NotFoundIllustration } from "@/components/error/not-found-illustration"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1">
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <NotFoundIllustration />

            <div className="mt-8 max-w-2xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Esta página se perdió</h1>
              <p className="text-lg text-gray-600 mb-8">
                Buscamos por todas partes y no la encontramos. Revisa que el link sea correcto.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/">
                    <Home className="w-5 h-5 mr-2" />
                    Ir al Inicio
                  </Link>
                </Button>

                <Button asChild variant="outline" size="lg">
                  <Link href="javascript:history.back()">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Volver Atrás
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
