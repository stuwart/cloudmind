'use server'

import prisma from '@/lib/prisma'

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: { posts: true },
        },
      },
    })
    return categories
  } catch (error) {
    console.error('获取分类失败:', error)
    return []
  }
}

export async function getTags() {
  try {
    const tags = await prisma.tag.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: { posts: true },
        },
      },
    })
    return tags
  } catch (error) {
    console.error('获取标签失败:', error)
    return []
  }
}

export async function getPostsByCategory(categoryId: number) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        categoryId,
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        category: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return posts
  } catch (error) {
    console.error('获取分类文章失败:', error)
    return []
  }
}

export async function getPostsByTag(tagId: number) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        tags: {
          some: {
            id: tagId,
          },
        },
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        category: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return posts
  } catch (error) {
    console.error('获取标签文章失败:', error)
    return []
  }
}

export async function getAllPosts() {
  try {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        createdAt: true,
        category: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return posts
  } catch (error) {
    console.error('获取文章列表失败:', error)
    return []
  }
}
