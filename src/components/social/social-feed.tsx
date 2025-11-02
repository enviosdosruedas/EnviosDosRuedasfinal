
// src/components/social/social-feed.tsx
'use client';

import type { SocialPost } from "@/types/social-post";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Facebook, Instagram, MessageSquare, MessageCircle as MessageIcon, Share2, ExternalLink, ThumbsUp } from "lucide-react";

interface SocialFeedProps {
  posts: SocialPost[];
}

const platformIcons = {
  facebook: Facebook,
  instagram: Instagram,
  whatsapp: MessageSquare,
};

const platformColors = {
  facebook: "bg-blue-600 hover:bg-blue-700",
  instagram: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
  whatsapp: "bg-green-500 hover:bg-green-600",
};

const PlatformIcon = ({ platform }: { platform: SocialPost['platform'] }) => {
  const Icon = platformIcons[platform];
  return <Icon className="w-5 h-5" />;
};

export function SocialFeed({ posts }: SocialFeedProps) {
  if (!posts || posts.length === 0) {
    return (
      <section className="py-16 px-4 bg-gray-100">
        <div className="container mx-auto text-center">
          <p className="text-lg text-gray-600">No hay publicaciones recientes para mostrar.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gray-100">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Mantente Conectado</h2>
          <p className="text-lg text-gray-600">
            Nuestras últimas actualizaciones y novedades de nuestras redes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col bg-white rounded-lg">
              <CardHeader className="flex flex-row items-center space-x-3 p-4 border-b">
                {post.user.avatarUrl ? (
                  <Image
                    src={post.user.avatarUrl}
                    alt={post.user.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <div className={`w-10 h-10 rounded-full ${platformColors[post.platform]} flex items-center justify-center text-white`}>
                    <PlatformIcon platform={post.platform} />
                  </div>
                )}
                <div>
                  <a href={post.user.profileUrl || post.postUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    <CardTitle className="text-base font-semibold text-gray-800">{post.user.name}</CardTitle>
                  </a>
                  <p className="text-xs text-gray-500">
                    {new Date(post.timestamp).toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })} en <span className="capitalize">{post.platform}</span>
                  </p>
                </div>
              </CardHeader>

              <CardContent className="p-4 flex-grow">
                {post.imageUrl && post.platform !== 'whatsapp' && (
                  <a href={post.postUrl} target="_blank" rel="noopener noreferrer" className="block mb-3 rounded-md overflow-hidden">
                    <Image
                      src={post.imageUrl}
                      alt={`Post de ${post.user.name} en ${post.platform}`}
                      width={400}
                      height={300}
                      className="w-full h-auto object-cover aspect-video"
                      data-ai-hint={post.imageHint || 'social media image'}
                    />
                  </a>
                )}
                
                <p className="text-gray-700 leading-relaxed mb-3 text-sm whitespace-pre-line line-clamp-4">
                  {post.content}
                </p>

                {post.platform === 'whatsapp' && (
                   <Button asChild className={`w-full mt-4 ${platformColors[post.platform]}`}>
                     <a href={post.postUrl} target="_blank" rel="noopener noreferrer">
                       <MessageSquare className="mr-2 h-4 w-4" /> Chatear en WhatsApp
                     </a>
                   </Button>
                )}
              </CardContent>

              {post.platform !== 'whatsapp' && (
                <CardFooter className="p-4 border-t flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-gray-500 text-xs">
                    {post.likes !== undefined && (
                      <span className="flex items-center"><ThumbsUp className="w-3.5 h-3.5 mr-1" /> {post.likes}</span>
                    )}
                    {post.comments !== undefined && (
                      <span className="flex items-center"><MessageIcon className="w-3.5 h-3.5 mr-1" /> {post.comments}</span>
                    )}
                     {post.shares !== undefined && (
                      <span className="flex items-center"><Share2 className="w-3.5 h-3.5 mr-1" /> {post.shares}</span>
                    )}
                  </div>
                  <Button variant="ghost" size="sm" asChild className="text-xs text-blue-600 hover:text-blue-700">
                    <a href={post.postUrl} target="_blank" rel="noopener noreferrer">
                      Ver Post <ExternalLink className="ml-1 w-3 h-3" />
                    </a>
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            Ver Más en Nuestras Redes <span className="ml-2">→</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
