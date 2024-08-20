export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24">
      {/* Side Navigation */}
      <nav className="fixed top-0 left-0 h-full w-64 bg-black text-white shadow-lg z-20">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-6">Menu</h2>
          <ul className="mt-14 space-y-4">
            <li><a href="#" className="block py-3 px-4 text-lg hover:bg-gray-700 rounded">Home</a></li>
            <li><a href="#" className="block py-3 px-4 text-lg hover:bg-gray-700 rounded">Create Dataset</a></li>
            <li><a href="#" className="block py-3 px-4 text-lg hover:bg-gray-700 rounded">Validate Dataset</a></li>
            <li><a href="#" className="block py-3 px-4 text-lg hover:bg-gray-700 rounded">Save Schema</a></li>
          </ul>
        </div>
      </nav>

      {/* Divider */}
      <div className="fixed top-0 left-64 h-full w-px bg-gray-400 z-10"></div>

      {/* Main Content */}
      <div className="ml-64 flex flex-col w-full pl-6">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
          <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit">
            <code className="font-mono font-bold">Data Science Hackathon</code>
          </p>
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black pb-6">
            Footer here
          </div>
        </div>
      </div>
    </main>
  );
}
