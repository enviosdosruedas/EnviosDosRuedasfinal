// src/app/nosotros/nuestras-redes/page.tsx
import { OptimizedHeader } from "@/components/homenew/optimized-header";
import { SocialHero } from "@/components/social/social-hero";
import { SocialConnect } from "@/components/social/social-connect";
import { SocialBenefits } from "@/components/social/social-benefits";
import { SocialFeed } from "@/components/social/social-feed";
import { NewsletterSignup } from "@/components/social/newsletter-signup";
import { Footer } from "@/components/homenew/footer";
import { getAllPosts } from "@/lib/social/posts";
import type { Metadata } from "next";
import { CarruselRedes } from "@/components/homenew/carrusel-redes";

export const metadata: Metadata = {
    title: "Conéctate en Redes Sociales",
    description: "Sigue a Envios DosRuedas en Facebook e Instagram para enterarte de las últimas noticias, promociones exclusivas y consejos de envío en Mar del Plata.",
    keywords: "redes sociales, facebook, instagram, whatsapp, promociones, noticias, envios mar del plata",
};

export const revalidate = 3600; // Revalidate data every hour

export default async function SocialNetworksPage() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen flex flex-col">
      <OptimizedHeader />
      <main className="flex-grow">
        <SocialHero />
        <SocialConnect />
        <SocialFeed posts={posts} />
        <SocialBenefits />
        <NewsletterSignup />
      </main>
      <CarruselRedes />
      <Footer />
    </div>
  );
}
