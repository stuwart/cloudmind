import { Suspense } from 'react'
import ArticleList from './ArticleList'
import { fetchArticles } from './actions'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const articles = await fetchArticles()

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<div>加载中...</div>}>
        <ArticleList initialArticles={articles} />
      </Suspense>
    </div>
  )
}
