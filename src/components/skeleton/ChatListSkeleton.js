import ChatItemSkeleton from "./ChatItemSkeleton";

export default function ChatListSkeleton({ count = 5 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <ChatItemSkeleton key={index} />
      ))}
    </>
  );
}
