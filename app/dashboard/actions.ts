'use server'

import prisma from '@/lib/prisma'

export async function fetchArticles() {
  try {
    const articles = await prisma.post.findMany()
    return articles
  } catch (error) {
    console.error('获取文章列表失败:', error)
    return []
  }
}
