import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isprotectedRoute = createRouteMatcher([
    '/', '/upcoming-meetings', '/previous-meetings', '/recordings', '/personal-room', '/meeting(.*)'
])
// console.log(isprotectedRoute)

export default clerkMiddleware(async (auth, req) => {
    if (isprotectedRoute(req)) await auth.protect();
})

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}