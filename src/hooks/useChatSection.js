import {
  resolveResponse,
  isErrorResponse,
} from "@/lib/wrapper/ResolveResponse";
import {
  signOutApi,
  getAllUsersApi,
  getChatApi,
  postChatApi,
} from "@/lib/constants/ApiRoutes";
import { Message } from "@/lib/constants/Message";
import { ToastType } from "@/lib/enum/ToastType";
import { AppRoute } from "@/lib/constants/AppRoute";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { clearToken } from "@/store/slices/authSlice";
import { useToast } from "@/contexts/ToastContext";

export default function useChatSection(chatId) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [chats, setChats] = useState([]);
  const [isLoadingChats, setIsLoadingChats] = useState(true);
  const [messages, setMessages] = useState([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      message: "",
    },
  });

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoadingChats(true);

      const response = await resolveResponse(getAllUsersApi());

      if (isErrorResponse(response)) {
        showToast(
          `${Message.LOAD_USERS_FAILED}: ${response.error}`,
          ToastType.ERROR
        );
        setIsLoadingChats(false);
        return;
      }

      setChats(response.data || []);
      setIsLoadingChats(false);
    };

    fetchUsers();
  }, [showToast]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!chatId) {
        setMessages([]);
        setIsLoadingMessages(false);
        return;
      }

      setIsLoadingMessages(true);

      const response = await resolveResponse(getChatApi(chatId));

      if (isErrorResponse(response)) {
        showToast(
          `${Message.LOAD_MESSAGES_FAILED}: ${response.error}`,
          ToastType.ERROR
        );
        setIsLoadingMessages(false);
        return;
      }

      const processedMessages = (response.data || []).map((msg) => ({
        ...msg,
        isSender: msg.senderId._id !== chatId,
      }));

      setMessages(processedMessages);
      setIsLoadingMessages(false);
    };

    fetchMessages();
  }, [chatId, showToast]);

  useEffect(() => {
    reset();
  }, [chatId, reset]);

  const onSubmit = async (data) => {
    if (!chatId || !data.message.trim()) {
      return;
    }

    const payload = {
      recipientId: chatId,
      message: data.message.trim(),
    };

    const response = await resolveResponse(postChatApi(payload));

    if (isErrorResponse(response)) {
      showToast(
        `${Message.SEND_MESSAGE_FAILED}: ${response.error}`,
        ToastType.ERROR
      );
      return;
    }

    const newMessage = {
      ...response.data,
      isSender: true,
    };
    setMessages((prev) => [...prev, newMessage]);

    reset();
  };

  const handleSignOut = async () => {
    setIsLoggingOut(true);

    const response = await resolveResponse(signOutApi());

    if (isErrorResponse(response)) {
      showToast(
        `${Message.SIGN_OUT_FAILED}: ${response.error}`,
        ToastType.ERROR
      );
      setIsLoggingOut(false);
      return;
    }

    dispatch(clearToken());

    showToast(Message.SIGN_OUT_SUCCESS, ToastType.SUCCESS);

    router.push(AppRoute.ROOT);
  };

  return {
    handleSignOut,
    isLoggingOut,
    chats,
    isLoadingChats,
    messages,
    isLoadingMessages,
    isSendingMessage: isSubmitting,
    register,
    handleSubmit,
    onSubmit,
  };
}
