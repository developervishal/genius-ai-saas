"use client"
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '../ui/card'
import { MAX_FREE_COUNTS } from '@/constants'
import { Progress } from '../ui/progress'
import { Button } from '../ui/button'
import { Zap } from 'lucide-react'
import { useProModal } from '@/hooks/use-pro-modal'

function FreeCounter({ apiLimitCount, isPro }: { apiLimitCount: number, isPro: boolean }) {
    //trick to avoid any hydration error
    const [mounted, setMounted] = useState(false)
    const proModal = useProModal()
    useEffect(() => {
        setMounted(true)
    }, [])
    if (!mounted) {
        return null
    }
    return (<>
        {!isPro && <div className='px-3 '>
            <Card className='bg-white/10 border-0'>
                <CardContent className='py-6'>
                    <div className='text-sm text-center text-white mb-2 space-y-2'>
                        <p>{apiLimitCount} / {MAX_FREE_COUNTS} Free Generations</p>
                        <Progress className='h-3'
                            value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
                        />
                    </div>
                    <Button className='w-full' variant="premium" onClick={proModal.onOpen}>
                        Upgrade
                        <Zap className='w-4 h-4 ml-2 fill-white' />
                    </Button>
                </CardContent>
            </Card>
        </div>}
    </>
    )
}

export default FreeCounter