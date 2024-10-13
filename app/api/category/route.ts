import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const categories = await prisma.category.findMany()
    return NextResponse.json(categories)
  } catch (error) {
    console.error('获取分类失败:', error)
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name } = body

    if (!name) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 })
    }

    // 尝试查找现有分类
    let category = await prisma.category.findUnique({
      where: { name },
    })

    // 如果分类不存在，则创建新分类
    if (!category) {
      category = await prisma.category.create({
        data: { name },
      })
    }

    return NextResponse.json(category)
  } catch (error: unknown) {
    console.error('Error handling category:', error)
    return NextResponse.json(
      {
        error: 'Failed to process category',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
