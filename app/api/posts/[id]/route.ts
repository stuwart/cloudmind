import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(params.id) },
      include: { category: true, tags: true, comments: true }
    })
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }
    return NextResponse.json(post)
  } catch (error) {
    console.error('获取帖子时出错:', error)
    return NextResponse.json({ error: '获取帖子失败' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const post = await prisma.post.update({
      where: { id: Number(params.id) },
      data: {
        title: body.title,
        content: body.content,
        published: body.published,
        categoryId: body.categoryId,
        tags: {
          set: body.tagIds.map((id: number) => ({ id }))
        }
      }
    })
    return NextResponse.json(post)
  } catch (error) {
    console.error('更新帖子时出错:', error)
    return NextResponse.json({ error: '更新帖子失败' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.post.delete({
      where: { id: Number(params.id) }
    })
    return NextResponse.json({ message: '帖子删除成功' })
  } catch (error) {
    console.error('删除帖子时出错:', error)
    return NextResponse.json({ error: '删除帖子失败' }, { status: 500 })
  }
}
