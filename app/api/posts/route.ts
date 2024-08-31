import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // 确保您有这个文件来初始化 Prisma 客户端

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: { category: true, tags: true },
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        published: body.published,
        categoryId: body.categoryId,
        tags: {
          connect: body.tagIds.map((id: number) => ({ id })),
        },
      },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
