import type {Metadata} from 'next'
import {Open_Sans} from 'next/font/google'
import './globals.css'
import {QueryClient} from "react-query";

const openSans = Open_Sans({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Disclone',
    description: 'Discord clone application',
}


export default function RootLayout({
children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={openSans.className}>
                {children}
            </body>
        </html>
    )
}
