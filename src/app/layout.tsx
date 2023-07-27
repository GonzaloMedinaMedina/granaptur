import './globals.css'
import NavBar from './NavBar/NavBar'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className=' bg-white'>
        <NavBar/>
        <hr></hr>
        {children}</body>
    </html>
  )
}
