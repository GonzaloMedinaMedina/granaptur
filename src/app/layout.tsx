'use client'
import './globals.css'
import NavBar from './components/NavBar/NavBar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body style={{backgroundColor: '#0c69ba1a'}}>
        <NavBar/>
        <hr className='border-black/20'></hr>
        <main style={{backgroundColor: '#0c69ba1a'}}>
          {children}
          <div className='h-[100px] bg-[#8c9bb3]'></div>
        </main>
      </body>
    </html>
  )
}
