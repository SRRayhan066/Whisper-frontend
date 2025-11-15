export default function ChatMessage({ message, isSender }) {
  const messageClass = isSender
    ? "bg-blue-500 text-white self-end"
    : "bg-neutral-700 text-white self-start";

  return (
    <div className={`w-fit max-w-lg rounded-lg p-3 ${messageClass}`}>
      <p>{message}</p>
    </div>
  );
}
