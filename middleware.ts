import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  // return await updateSession(request)
  return NextResponse.next()
}

// export const config = {
//   matcher: [
//     /*
//      * 匹配所有请求路径，除了以下开头的路径：
//      * - _next/static (静态文件)
//      * - _next/image (图片优化文件)
//      * - favicon.ico (网站图标)
//      */
//     '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
//   ],
// }
