// src/app/admin/add-post/page.tsx
import { AdminHeader } from "@/components/layout/AdminHeader";
import { CarruselRedes } from "@/components/homenew/carrusel-redes";
import { Footer } from "@/components/homenew/footer";
import { AddPostForm } from "@/components/admin/AddPostForm";

export default function AddSocialPostPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <AdminHeader />
      <main className="flex-grow container mx-auto px-4 py-8 pt-24">
        <h1 className="text-3xl font-bold text-center mb-8 text-primary">Agregar Nueva Publicación Social</h1>
        <AddPostForm />
      </main>
      <CarruselRedes />
      <Footer />
    </div>
  );
}