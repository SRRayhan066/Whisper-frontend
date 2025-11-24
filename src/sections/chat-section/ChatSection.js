"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/button/Button";
import ChatItem from "@/components/chat-item/ChatItem";
import Input from "@/components/ui/input/Input";
import ChatMessage from "@/components/chat-message/ChatMessage";
import ChatListSkeleton from "@/components/skeleton/ChatListSkeleton";
import ChatMessageListSkeleton from "@/components/skeleton/ChatMessageListSkeleton";
import useChatSection from "@/hooks/useChatSection";

export default function ChatSection() {
  const searchParams = useSearchParams();
  const chatId = searchParams.get("id");
  const {
    handleSignOut,
    isLoggingOut,
    chats,
    isLoadingChats,
    messages,
    isLoadingMessages,
    isSendingMessage,
    register,
    handleSubmit,
    onSubmit,
  } = useChatSection(chatId);

  return (
    <div className="w-full h-screen flex flex-col bg-neutral-900 text-white">
      <div className="flex justify-end py-1 px-2 border-b border-b-neutral-600">
        <Button
          className="bg-red-500"
          onClick={handleSignOut}
          loading={isLoggingOut}
          disabled={isLoggingOut}
        >
          Log Out
        </Button>
      </div>
      <div className="h-full flex">
        <div className="w-80 h-full border-r border-r-neutral-600 flex flex-col">
          {isLoadingChats ? (
            <ChatListSkeleton count={6} />
          ) : chats.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-slate-400">No users found</p>
            </div>
          ) : (
            chats.map((chat) => (
              <Link href={`/chat?id=${chat._id}`} key={chat._id}>
                <ChatItem
                  userName={chat.name}
                  message={chat.email}
                  isSelected={chatId === chat._id}
                />
              </Link>
            ))
          )}
        </div>
        <div className="grow flex flex-col">
          {!chatId ? (
            <div className="grow flex justify-center items-center backdrop-blur-sm">
              <p className="text-2xl text-slate-400">
                Choose who you want to chat with
              </p>
            </div>
          ) : (
            <>
              <div className="grow p-4 overflow-y-auto flex flex-col gap-4">
                {isLoadingMessages ? (
                  <ChatMessageListSkeleton count={5} />
                ) : messages.length === 0 ? (
                  <div className="flex justify-center items-center h-full">
                    <p className="text-slate-400">No messages yet</p>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <ChatMessage
                      key={msg._id}
                      message={msg.message}
                      isSender={msg.isSender}
                    />
                  ))
                )}
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-4 border-t border-t-neutral-600 flex items-center gap-2"
              >
                <Input
                  placeholder="Type your message..."
                  className="grow"
                  {...register("message")}
                  disabled={isSendingMessage}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(onSubmit)();
                    }
                  }}
                />
                <Button
                  type="submit"
                  loading={isSendingMessage}
                  disabled={isSendingMessage}
                >
                  Send
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
