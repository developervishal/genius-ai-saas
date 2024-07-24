import { auth } from "@clerk/nextjs/server"


export const checkSubscription = async () => {
    const { userId } = auth()
    if (!userId) {
        return false
    }

    const userSubscription = await prisma?.userSubscription.findUnique({
        where: {
            userId
        }, select: {
            stripeCurrentPeriodEnd: true,
            stripeCustomerId: true,
            stripePriceId: true,
            stripeSubscriptionId: true
        }
    })
    if (!userSubscription) {
        return false
    }
    let isValid = false
    if (userSubscription.stripePriceId && userSubscription.stripeCurrentPeriodEnd) {
        const timePeriod = new Date(userSubscription.stripeCurrentPeriodEnd).getTime()
        isValid = timePeriod > Date.now()
    }
    return !!isValid
} 