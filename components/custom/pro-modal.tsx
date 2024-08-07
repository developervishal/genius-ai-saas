"use client"
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Badge } from '../ui/badge'
import { MessageSquare, ImageIcon, VideoIcon, Music2Icon, Code, Check, Zap } from 'lucide-react'
import { Card } from '../ui/card'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { useProModal } from '@/hooks/use-pro-modal'
import axios from 'axios'

const tools = [
    {
        label: "Conversation",
        icon: MessageSquare,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        color: "text-pink-700",
        bgColor: "bg-pink-700/10",

    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        color: "text-orange-700",
        bgColor: "bg-orange-700/10",

    },
    {
        label: "Music Generation",
        icon: Music2Icon,
        color: "text-green-700",
        bgColor: "bg-green-700/10",

    },
    {
        label: "Code Generation",
        icon: Code,
        color: "text-emrald-700",
        bgColor: "bg-emrald-700/10",

    }
]

function ProModal() {
    const proModal = useProModal()
    const [loading, setLoading] = useState(false)
    const onSubscribe = async () => {
        try {
            setLoading(true)
            const response = await axios.get('/api/stripe')
            window.location.href = response.data.url
        } catch (err) {
        
        } finally {
            setLoading(false)
        }
    }
    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='flex justify-center items-center flex-col gap-y-4 pb-2'>
                        <div className='flex items-center gap-x-2 py-1 font-bold'>
                            Upgrade to Genius
                            <Badge className='uppercase text-sm py-1' variant="premium">
                                pro
                            </Badge>
                        </div>
                    </DialogTitle>
                    <DialogDescription className='text-center pt-2 space-y-2 text-zinc-900 font-medium'>
                        {tools.map((tool) => (
                            <Card key={tool.label} className='p-3 border-black/5 flex items-center justify-between'>
                                <div className='flex items-center gap-x-2'>
                                    <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                        <tool.icon className={cn("w-6 h-6", tool.color)} />
                                    </div>
                                    <div className='font-semibold text-sm'>
                                        {tool.label}
                                    </div>
                                </div>
                                <Check className='text-primary h-5 w-5' />
                            </Card>
                        ))}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="premium" size="lg" className='w-full' onClick={onSubscribe}>
                        Upgrade
                        <Zap className='fill-white w-5 h-5 pl-2' />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ProModal