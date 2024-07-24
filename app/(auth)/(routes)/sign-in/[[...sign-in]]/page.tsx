import { SignIn } from '@clerk/nextjs'
import React from 'react'

function SignInPage() {
    return (
        <SignIn forceRedirectUrl={'/dashboard'} />
    )
}

export default SignInPage