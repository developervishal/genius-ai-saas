import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { OpenAI } from 'openai'
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs'

import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit'
import { checkSubscription } from '@/lib/subscription'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

const instructionMessage: ChatCompletionMessageParam = {
    role: "system",
    content: "You are an expert software developer and teacher. When provided with a request, generate the appropriate code and then explain the code in detail. Make sure the code is well-commented and the explanation is clear and easy to understand for someone who might be new to the topic"
}
export async function POST(req: Request) {
    try {
        const { userId } = auth()
        const body = await req.json()
        const { messages } = body
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        if (!messages) {
            return new NextResponse("Messages are required", { status: 400 })

        }
        const freeTrail = await checkApiLimit()
        const isPro = await checkSubscription()
        if (!freeTrail && !isPro) {
            return new NextResponse("Free trail has expired", { status: 403 })
        }
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [instructionMessage, ...messages]
        })
        if (!isPro) {
            await increaseApiLimit()
        }
        return NextResponse.json(response.choices[0].message)
    } catch (err) {
        return new NextResponse("Internal error", { status: 500 })
    }
}