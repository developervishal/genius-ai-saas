"use client"
import { useAuth } from '@clerk/nextjs'
import React from 'react'
import TypewriterComponent from 'typewriter-effect'
import { Button } from '../ui/button'
import Link from 'next/link'

function LandingHero() {
    const { isSignedIn } = useAuth()
    return (
        <div className='text-white font-bold py-36 space-y-5 text-center'>
            <div className='text-4xl font-extrabold space-y-5 sm:text-6xl md:text-7xl lg:text-8xl'>
                <h1>The Best AI tool for</h1>
                <div className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
                    <TypewriterComponent
                        options={{
                            strings: [
                                'Chatbot.',
                                'Photo Generation.',
                                'Music Generation.',
                                'Video Generation.',
                                'Code Generation.',

                            ],
                            autoStart: true,
                            loop: true
                        }}
                    />
                </div>
            </div>
            <div className='text-lg md:text-2xl text-zinc-400 font-light mt-10'>
                Create content using AI 10x faster
            </div>
            <div>
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"} >
                    <Button variant={'premium'} className='md:text-lg p-4 md:p-6 rounded-full'>
                        Start Generating For Free
                    </Button>
                </Link>
            </div>
            <div className='text-zinc-400 text-xs md:text-sm font-normal'>
                No credit card required.
            </div>
        </div>
    )
}

export default LandingHero