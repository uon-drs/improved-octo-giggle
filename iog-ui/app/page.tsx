'use client';
import { useRouter } from 'next/navigation'; // Import for client-side navigation

export default function Home() {
  const router = useRouter(); // Hook for navigation

  const handleButtonClick = () => {
    router.push('/dashboard'); // Navigate to the dashboard page
  };

  return (
    <main className="flex min-h-screen flex-col p-24 bg-gradient-to-b from-zinc-200 to-white dark:from-zinc-800 dark:to-black">
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-1 text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Data Science Hackathon</h1>
        <p className="text-lg mb-8">
          Join us for an exciting event where data science meets innovation. Explore challenges, network with experts, and showcase your skills.
        </p>
        <button
          onClick={handleButtonClick}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
        >
          Get Started
        </button>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 w-full flex items-center justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black py-6">
        Footer here
      </div>
    </main>
  );
}
