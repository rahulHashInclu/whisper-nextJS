'use client';

import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import TopRightAvatar from "../custom-ui/avatar";
import { useSession } from "next-auth/react";



export default function AiChatInterface(){
    const { data:session } = useSession();
    const messages = [
        {
          id: 1,
          content: "Who was the leader of the teaching conference mentioned in the podcast?",
          sender: "user"
        },
        {
          id: 2,
          content: "The leader of the teaching conference mentioned in the podcast was Blaine Ray.",
          sender: "assistant"
        },
        {
            id: 3,
            content: "The leader of the teaching conference mentioned in the podcast was Blaine Ray.",
            sender: "assistant"
          },
          {
            id: 4,
            content: "The leader of the teaching conference mentioned in the podcast was Blaine Ray.",
            sender: "user"
          }
      ];
    return (
        <>
          <ScrollArea className="h-64">
            <div className="space-y-3">
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
                        <TopRightAvatar userName={session?.user?.name}/>
                    
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
            </div>
          </ScrollArea>
          
          <div className="p-4">
            <div className="flex gap-2">
              <Input 
                placeholder="AI Assistant" 
                className="flex-1 bg-uploadInput-bg border-0 text-white placeholder:text-gray-500"
              />
              <div className="w-10 h-10 rounded bg-gray-800 flex items-center justify-center">
                {/* Placeholder for send button */}
              </div>
            </div>
          </div>
        
      </>
    )

}