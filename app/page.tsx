import Image from 'next/image';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to CloudMind </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* 博客文章卡片 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">文章标题</h2>
            <p className="text-gray-600 mb-4">这里是文章摘要，简短介绍文章内容...</p>
            <a href="#" className="text-blue-500 hover:underline">
              阅读更多
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <a
          href="#"
          className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300"
        >
          查看所有文章
        </a>
      </div>
    </main>
  );
}
