'use server'
import { BentoCard, BentoGrid } from '@/components/ui/bento-grid'
import RetroGrid from '@/components/ui/retro-grid'
import { BadgeInfo, FolderOpenDot, Newspaper } from 'lucide-react'

export default async function Home() {
  const features = [
    {
      Icon: Newspaper,
      name: 'Posts',
      description: 'my learnint notes and thoughts here',
      href: '/post',
      cta: 'Learn more',
      background: <div className="absolute -right-20 -top-20 opacity-60" />,
      className: 'lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3'
    },
    {
      Icon: FolderOpenDot,
      name: 'Project',
      description: 'my personal projects you might be interested in',
      href: '/project',
      cta: 'Learn more',
      background: <div className="absolute -right-20 -top-20 opacity-60" />,
      className: 'lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2'
    },
    {
      Icon: BadgeInfo,
      name: 'About',
      description: 'something about me',
      href: '/about',
      cta: 'Learn more',
      background: <div className="absolute -right-20 -top-20 opacity-60" />,
      className: 'lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4'
    }
  ]

  return (
    <>
      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
        <span className="pointer-events-none  z-10 whitespace-pre-wrap bg-gradient-to-b from-[#5ebac8] via-[#69c1f1] to-[#4d7492] bg-clip-text text-center text-7xl font-bold leading-none tracking-wide text-transparent">
          CloudMind
        </span>
        <RetroGrid />
      </div>
      <div className="container mx-auto">
        <BentoGrid className="lg:grid-rows-3">
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </>
  )
}
