import { SignUp } from '@clerk/nextjs'
import React from 'react'

function SingUpPage() {
    return (
        <SignUp forceRedirectUrl={'/dashboard'} fallbackRedirectUrl={'/dashboard'} />
    )
}

export default SingUpPage