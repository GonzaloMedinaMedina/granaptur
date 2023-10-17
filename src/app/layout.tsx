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
      <body style={{backgroundColor: 'rgb(200 218 234)'}}>
        <NavBar/>
        <hr className='border-black/20'></hr>
        <main>
          {children}
          <div className='h-[100px] bg-[#8c9bb3]'></div>
        </main>
      </body>
    </html>
  )
}
