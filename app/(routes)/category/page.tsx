import { Suspense } from 'react'
import { SelectCategory } from './selectCategory'
import { PostList } from './postList'
import prisma from '@/lib/prisma'

async function getCategories() {
  try {
    return await prisma.category.findMany()
  } catch (error) {
    console.error('获取分类失败:', error)
    throw new Error('获取分类失败')
  }
}

async function getPosts() {
  try {
    return await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        createdAt: true,
        category: {
          select: {
            name: true
          }
        }
      },
      take: 20 // 限制返回的文章数量
    })
  } catch (error) {
    console.error('获取文章失败:', error)
    throw new Error('获取文章失败')
  }
}

export default async function CategoryPage() {
  const [categories, posts] = await Promise.all([getCategories(), getPosts()])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex">
        <div className="w-1/4 pr-4">
          <h2 className="text-2xl font-bold mb-4">分类</h2>
          <Suspense fallback={<div>加载分类中...</div>}>
            <SelectCategory categories={categories} />
          </Suspense>
        </div>
        <div className="w-3/4">
          <h2 className="text-2xl font-bold mb-4">文章列表</h2>
          <Suspense fallback={<div>加载文章中...</div>}>
            <PostList initialPosts={posts} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
