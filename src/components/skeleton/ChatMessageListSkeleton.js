import ChatMessageSkeleton from "./ChatMessageSkeleton";

export default function ChatMessageListSkeleton({ count = 5 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <ChatMessageSkeleton key={index} isSender={index % 2 === 0} />
      ))}
    </>
  );
}
