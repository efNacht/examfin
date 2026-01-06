import './globals.css'

export const metadata = {
  title: 'CAMELS Trainer | Тренажёр',
  description: 'Interactive CAMELS analysis trainer for banking exam preparation',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
