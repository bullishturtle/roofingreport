"use client"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 p-4 text-white">
      <div className="container mx-auto">
        <p className="text-center">&copy; {currentYear} RoofFax™ | All rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer
