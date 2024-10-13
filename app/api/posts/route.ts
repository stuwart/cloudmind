import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma' // 确保您有这个文件来初始化 Prisma 客户端

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: { category: true, tags: true },
    })
    return NextResponse.json(posts)
  } catch (error) {
    console.error('获取帖子失败:', error)
    return NextResponse.json({ error: '获取帖子失败' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Received body:', body)

    if (!body.title || !body.content || !body.categoryId) {
      console.log('Missing required fields')
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    const tags =
      body.tags && Array.isArray(body.tags) && body.tags.length > 0
        ? {
            connect: body.tags
              .map((id: string) => {
                const parsedId = parseInt(id)
                if (isNaN(parsedId)) {
                  console.error(`Invalid tag ID: ${id}`)
                  return null
                }
                return { id: parsedId }
              })
              .filter(Boolean),
          }
        : undefined

    console.log('Processed tags:', tags)
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        published: body.published ?? false,
        categoryId: parseInt(body.categoryId),
        tags: tags,
      },
      include: {
        tags: true, // 明确包含 tags 关系
      },
    })

    console.log('Created post:', post)
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: '创建帖子失败', details: (error as Error).message },
      { status: 500 }
    )
  }
}
