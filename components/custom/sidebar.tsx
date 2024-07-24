'use client'

import { cn } from "@/lib/utils"
import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music2Icon, Settings, VideoIcon } from "lucide-react"
import { Montserrat } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import FreeCounter from "./free-counter"
const monteserrat = Montserrat({
    weight: "600",
    subsets: ["latin"]
})
const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500"
    },
    {
        label: "Conversation",
        icon: MessageSquare,
        href: "/conversation",
        color: "text-violet-500"
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-pink-700"
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        href: "/video",
        color: "text-orange-700"
    },
    {
        label: "Music Generation",
        icon: Music2Icon,
        href: "/music",
        color: "text-green-700"
    },
    {
        label: "Code Generation",
        icon: Code,
        href: "/code",
        color: "text-emerald-700"
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/settings",
        color: "text-emrald-700"
    }
]
const Sidebar = ({ apiLimitCount, isPro = false }: { apiLimitCount: number, isPro: boolean }) => {
    const pathname = usePathname()
    return (
        <div className="space-y-4 py-4 px-3 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-3 py-2">
                <Link href='/dashboard' className="flex items-center pl-3 mb-14">
                    <Image alt="logo" src="/logo.png" width={32} height={32} className="mr-2" />
                    <h1 className={cn("text-2xl font-bold", monteserrat.className)}>Genius</h1>
                </Link>
            </div>
            <div className="space-y-1 h-full">
                {routes.map((route) => {
                    return <Link
                        key={route.href}
                        href={route.href}
                        className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition", pathname === route.href ? "text-white bg-white/10 " : "text-zinc-400")}
                    >
                        <div className="flex items-center flex-1">
                            <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                            {route.label}
                        </div>
                    </Link>
                })}
            </div>
            <FreeCounter apiLimitCount={apiLimitCount} isPro={isPro} />
        </div>
    )
}

export default Sidebar