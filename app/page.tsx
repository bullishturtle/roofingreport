import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          RoofFax Report
        </p>
      </div>

      <div className="relative flex place-items-center my-16">
        <h1 className="text-4xl font-bold">Welcome to RoofFax Report</h1>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-3 lg:text-left">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className="mb-3 text-2xl font-semibold">Features</h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">Explore our comprehensive roof analysis tools.</p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className="mb-3 text-2xl font-semibold">Pricing</h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">Find the right plan for your needs.</p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className="mb-3 text-2xl font-semibold">Contact</h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">Get in touch with our team.</p>
        </div>
      </div>

      <footer className="w-full border-t border-gray-300 py-8 text-center">
        <p>Powered by RoofFax™ | All rights reserved</p>
        <div className="mt-4 flex justify-center space-x-4">
          <Link href="/terms" className="text-blue-500 hover:underline">
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-blue-500 hover:underline">
            Privacy Policy
          </Link>
        </div>
        <div className="mt-4">
          <p>Email: Landon@rooffax.com</p>
          <p>Phone: (850) 879-9172</p>
        </div>
      </footer>
    </main>
  )
}
