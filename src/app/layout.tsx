import './globals.css'
import NavBar from './components/NavBar/NavBar'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="min-w-full min-h-full" lang="en">
      <body className='min-w-full min-h-full bg-white'>
        <NavBar/>
        <hr></hr>
        <main className="flex min-h-screen flex-col items-center justify-between">
          {children}
        </main>
      </body>
    </html>
  )
}
