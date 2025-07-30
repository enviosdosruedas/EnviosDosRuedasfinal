// src/lib/social/posts.ts
import prisma from "@/lib/prisma";
import type { SocialPost as SocialPostType } from "@/types/social-post";
import type { SocialPost } from "@prisma/client";

/**
 * Fetches all social posts from the database and sorts them by timestamp descending.
 * @returns A sorted array of SocialPost objects.
 */
export async function getAllPosts(): Promise<SocialPostType[]> {
  const postsFromDb = await prisma.socialPost.findMany({
    orderBy: {
      timestamp: 'desc',
    },
  });

  // Map Prisma model to our application's SocialPostType
  return postsFromDb.map(post => ({
    id: String(post.id),
    platform: post.platform.toLowerCase() as 'facebook' | 'instagram' | 'whatsapp',
    user: {
      name: post.userName,
      avatarUrl: post.userAvatar || undefined,
      profileUrl: post.userUrl || undefined,
    },
    content: post.content,
    imageUrl: post.imageUrl || undefined,
    imageHint: post.imageHint || undefined,
    postUrl: post.postUrl,
    timestamp: post.timestamp, // Keep as Date object
    likes: post.likes ?? undefined,
    comments: post.comments ?? undefined,
    shares: post.shares ?? undefined,
  }));
}
