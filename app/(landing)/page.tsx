import LandingContent from '@/components/custom/landing-content'
import LandingHero from '@/components/custom/landing-hero'
import LandingNavbar from '@/components/custom/landing-navbar'
import React from 'react'

function LandingPage() {
    return (
        <div className='h-full'>
            <LandingNavbar />
            <LandingHero />
        </div>
    )
}

export default LandingPage