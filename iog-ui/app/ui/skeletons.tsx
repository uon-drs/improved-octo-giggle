// Shimmer Effect
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

// Card Skeleton for Dashboard
function CardSkeleton() {
  return (
    <div className={`group block rounded-lg border border-gray-300 bg-gray-100 p-6 shadow-md relative overflow-hidden ${shimmer}`}>
      <div className="h-6 w-24 rounded bg-gray-200 mb-4"></div>
      <div className="h-4 w-36 rounded bg-gray-200"></div>
    </div>
  );
}

// Dashboard Skeleton
export default function DashboardSkeleton() {
  return (
    <main className="flex min-h-screen flex-col p-6 lg:p-24">
      {/* Main Content */}
      <div className="ml-64 flex flex-col w-full pl-6">
        {/* Header and Footer */}
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
          <div className={`fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gray-100 pb-6 pt-8 relative overflow-hidden ${shimmer}`}>
            <div className="h-6 w-64 rounded bg-gray-200"></div>
          </div>
          <div className={`fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gray-100 pb-6 relative overflow-hidden ${shimmer}`}>
            <div className="h-6 w-48 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
