'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'

export async function fetchArticles() {
  try {
    const articles = await prisma.post.findMany()
    revalidatePath('/dashboard')
    return articles
  } catch (error) {
    console.error('获取文章列表失败:', error)
    return []
  }
}
