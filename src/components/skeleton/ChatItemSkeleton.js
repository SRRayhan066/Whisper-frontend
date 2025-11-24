export default function ChatItemSkeleton() {
  return (
    <div className="flex items-center p-4 animate-pulse">
      <div className="shrink-0 w-12 h-12 rounded-full bg-neutral-700 mr-4"></div>

      <div className="grow space-y-2">
        <div className="h-5 bg-neutral-700 rounded w-3/4"></div>
        <div className="h-4 bg-neutral-700 rounded w-1/2"></div>
      </div>
    </div>
  );
}
