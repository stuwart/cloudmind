import React from 'react'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const metadata = {
  title: '文章列表'
}

async function getPosts() {
  try {
    const posts = await prisma.post.findMany({
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
      orderBy: {
        createdAt: 'desc'
      }
    })
    return posts
  } catch (error) {
    console.error('获取文章列表失败:', error)
    return []
  }
}

export default async function PostListPage() {
  const posts = await getPosts()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">文章列表</h1>
      <div className="grid gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow-md rounded-lg p-6">
            <Link href={`/post/${post.id}`} className="text-xl font-semibold hover:text-blue-600">
              {post.title}
            </Link>
            <p className="text-gray-600 mt-2">
              分类: {post.category?.name || '未分类'} | 发布时间:{' '}
              {new Date(post.createdAt).toLocaleDateString('zh-CN')}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
