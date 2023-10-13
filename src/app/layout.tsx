'use client'
import './globals.css'
import NavBar from './components/NavBar/NavBar'
import Image from 'next/image'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className='bg-adblueback/10'>
        <NavBar/>
        <hr className='border-black'></hr>
        <main>
          {children}
          <div className='h-[100px] bg-[#8c9bb3]'></div>
        </main>
      </body>
    </html>
  )
}
