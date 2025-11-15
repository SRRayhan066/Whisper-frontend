export default function ChatItem({ userName, message, isSelected }) {
  const firstLetter = userName ? userName.charAt(0).toUpperCase() : "";

  return (
    <div
      className={`flex items-center p-4 hover:bg-neutral-800 cursor-pointer ${
        isSelected ? "bg-neutral-700" : ""
      }`}
    >
      <div className="shrink-0 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold mr-4">
        {firstLetter}
      </div>

      <div className="grow overflow-hidden">
        <h3 className="text-lg font-semibold text-slate-200">{userName}</h3>
        <p className="text-slate-400 text-sm truncate">{message}</p>
      </div>
    </div>
  );
}
