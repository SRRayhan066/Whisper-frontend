export default function ChatMessageSkeleton({ isSender = false }) {
  const alignmentClass = isSender ? "self-end" : "self-start";

  return (
    <div className={`w-fit max-w-lg animate-pulse ${alignmentClass}`}>
      <div className="h-12 bg-neutral-700 rounded-lg w-64"></div>
    </div>
  );
}
