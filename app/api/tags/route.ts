import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const tags = await prisma.tag.findMany()
    return NextResponse.json(tags)
  } catch (error) {
    console.error('获取标签失败:', error)
    return NextResponse.json({ error: '获取标签失败' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { names } = body

    if (!names || !Array.isArray(names) || names.length === 0) {
      return NextResponse.json({ error: '标签名称是必需的' }, { status: 400 })
    }

    const tags = await Promise.all(
      names.map(async (name) => {
        // 尝试查找现有标签
        let tag = await prisma.tag.findUnique({
          where: { name },
        })

        // 如果标签不存在，则创建新标签
        if (!tag) {
          tag = await prisma.tag.create({
            data: { name },
          })
        }

        return tag
      })
    )

    return NextResponse.json(tags)
  } catch (error) {
    console.error('处理标签时出错:', error)
    return NextResponse.json(
      { error: '处理标签失败', details: error instanceof Error ? error.message : '未知错误' },
      { status: 500 }
    )
  }
}
