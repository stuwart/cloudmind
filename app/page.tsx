'use server'
import { AnimatedList } from '@/components/ui/animated-list'
import { BentoCard, BentoGrid } from '@/components/ui/bento-grid'
import Marquee from '@/components/ui/marquee'
import Particles from '@/components/ui/particles'
import TypingAnimation from '@/components/ui/typing-animation'
import { cn } from '@/lib/utils'
import { Newspaper, Shell, BadgeInfo, FolderDot } from 'lucide-react'
interface Item {
  name: string
  description: string
  icon: string
  color: string
  time: string
}

let notifications = [
  {
    name: '偏我来时不逢春',
    description: '无需赞颂苦难，苦难自会开花',
    time: '15d ago',
    icon: '💸',
    color: '#00C9A7'
  },
  {
    name: '珍惜当下',
    description: '最美好的是现在，最珍贵的是眼前',
    time: '10d ago',
    icon: '🍟',
    color: '#FFB800'
  },
  {
    name: '既来之，则安之',
    description: '既然无法改变，那就欣然接受',
    time: '5d ago',
    icon: '💬',
    color: '#FF3D71'
  },
  {
    name: '做自己',
    description: '做自己想做的事，做自己想做的人',
    time: '2d ago',
    icon: '🗞️',
    color: '#1E86FF'
  }
]

notifications = Array.from({ length: 10 }, () => notifications).flat()
const Notification = ({ name, description, icon, color, time }: Item) => {
  return (
    <figure
      className={cn(
        'relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4',
        // animation styles
        'transition-all duration-200 ease-in-out hover:scale-[103%]',
        // light styles
        'bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
        // dark styles
        'transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]'
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color
          }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">{description}</p>
        </div>
      </div>
    </figure>
  )
}
export default async function Home() {
  const files = [
    {
      name: 'Vue',
      body: 'Vue is a progressive JavaScript framework for building user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable.'
    },
    {
      name: 'React',
      body: 'React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies.'
    },
    {
      name: 'Next.js',
      body: 'Next.js is a framework for building server-rendered React applications. It is maintained by Vercel and a community of individual developers and companies.'
    },
    {
      name: 'Tailwind',
      body: 'Tailwind CSS is a utility-first CSS framework for rapidly building custom designs.'
    },
    {
      name: 'TypeScript',
      body: 'TypeScript is a programming language that is a superset of JavaScript. It is maintained by Microsoft and a community of individual developers and companies.'
    },
    {
      name: 'Python',
      body: 'Python is a programming language that is widely used for web development, data analysis, and artificial intelligence.'
    },
    {
      name: 'Java',
      body: 'Java is a programming language that is widely used for building enterprise applications.'
    },
    {
      name: 'Go',
      body: 'Go is a programming language that is widely used for building enterprise applications.'
    }
  ]
  const features = [
    {
      Icon: Newspaper,
      name: 'Notes',
      description: 'My notes on learning new technologies.',
      href: '#',
      cta: 'Read more',
      className: 'col-span-3 lg:col-span-1',
      background: (
        <Marquee
          pauseOnHover
          className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
        >
          {files.map((f, idx) => (
            <figure
              key={idx}
              className={cn(
                'relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4',
                'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
                'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]',
                'transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none'
              )}
            >
              <div className="flex flex-row items-center gap-2">
                <div className="flex flex-col">
                  <figcaption className="text-sm font-medium dark:text-white ">{f.name}</figcaption>
                </div>
              </div>
              <blockquote className="mt-2 text-xs">{f.body}</blockquote>
            </figure>
          ))}
        </Marquee>
      )
    },
    {
      Icon: Shell,
      name: 'Thoughts',
      description: 'Some thoughts on life.',
      href: '#',
      cta: 'Learn more',
      className: 'col-span-3 lg:col-span-2',
      background: (
        <AnimatedList className="absolute right-2 top-4 h-[300px] w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105">
          {notifications.map((item, idx) => (
            <Notification {...item} key={idx} />
          ))}
        </AnimatedList>
      )
    },
    {
      Icon: FolderDot,
      name: 'Projects & Works',
      description: 'Some projects I have worked on.',
      href: '#',
      cta: 'Learn more',
      className: 'col-span-3 lg:col-span-2',
      background: <></>
    },
    {
      Icon: BadgeInfo,
      name: 'About',
      description: 'More about me and some friends',
      className: 'col-span-3 lg:col-span-1',
      href: '#',
      cta: 'Learn more',
      background: (
        <TypingAnimation
          className="text-4xl font-bold text-gray-500 dark:text-white relative top-[130px]"
          text="Info & Resource"
        />
      )
    }
  ]

  return (
    <div>
      <div className="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden  bg-[#7baeff] ">
        <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-[#fdfbfbe4] to-[#ebedee] bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
          Cloudmind
        </span>
        <Particles
          className="absolute inset-0"
          quantity={300}
          ease={100}
          color={'#ffffff'}
          refresh
        />
      </div>
      <div className="mx-auto w-2/3 relative top-[-50px]">
        <BentoGrid>
          {features.map((feature, idx) => (
            <BentoCard key={idx} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </div>
  )
}
