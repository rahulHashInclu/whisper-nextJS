"use client";

import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import TopRightAvatar from "../custom-ui/avatar";
import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { AudioService } from "@/lib/audioService";
import { Alert, AlertDescription } from "../ui/alert";


export default function AiChatInterface({ recordingId }) {
  const { data: session } = useSession();
  const [queryInput, setQueryInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef(null);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleQueryInputChange = (e) => {
    const value = e.target.value;
    setQueryInput(value);
  };

  const addMessage = (content, sender) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        content,
        sender,
      },
    ]);
  };

  const handleSendQueryClick = async () => {
    if (!queryInput.trim() || !recordingId) return;

    try {
      setIsLoading(true);
      addMessage(queryInput, "user");
      setQueryInput("");
      if (recordingId) {
        const response = await AudioService.getAIResponse(
          queryInput,
          recordingId
        );
        console.log(response);
        if (response?.ok && response?.status === 200) {
          const answer = response?.data?.answer;
          if (answer) {
            // Add AI response
            addMessage(answer, "assistant");
          } else {
            addMessage(
              "Sorry, I encountered an error processing your request.",
              "assistant"
            );
          }
        } else {
          addMessage(
            "Sorry, I encountered an error processing your request.",
            "assistant"
          );
        }
      }
    } catch (err) {
      console.error("AI api issue", err);
      addMessage(
        "Sorry, I encountered an error processing your request.",
        "assistant"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendQueryClick();
    }
  };

  return (
    <>
      <ScrollArea className="h-64 md:px-2" ref={scrollAreaRef}>
        <div className="space-y-3">
        {messages.length === 0 && (
            <div className="p-4">
              <Alert className="bg-uploadInput-bg border-0">
                <AlertDescription className="text-white">
                  Ask your questions about the meeting
                </AlertDescription>
              </Alert>
            </div>
          )}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex gap-3 max-w-[80%] ${
                  message.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <TopRightAvatar userName={session?.user?.name} />

                <div
                  className={`rounded-lg text-sm p-2 ${
                    message.sender === "user"
                      ? "bg-uploadInput-bg text-white border border-[#FFFFFF0D]"
                      : "text-white"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <TopRightAvatar userName={session?.user?.name} />
                <div className="rounded-lg text-sm p-2 bg-gray-800 text-white">
                  Thinking...
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4">
        <div className="flex gap-2">
          <Input
            placeholder="Ask your question"
            className="flex-1 bg-uploadInput-bg border-0 text-white placeholder:text-gray-500"
            onChange={handleQueryInputChange}
            value={queryInput}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <Button
            className="w-10 h-10 rounded bg-gray-800 flex items-center justify-center"
            onClick={handleSendQueryClick}
            disabled={isLoading || !queryInput.trim()}
          >
            Send
          </Button>
        </div>
      </div>
    </>
  );
}
