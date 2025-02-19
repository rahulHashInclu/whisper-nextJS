"use client";

import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { AudioService } from "@/lib/audioService";
import { getAssetPath } from "@/lib/utils";
import Image from "next/image";
import AiChatMessageBox from "./ai_chat_message_box";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const aiChatBottomIcon = getAssetPath("/assets/icons/AI_chat_input_icon.svg");
const aiChatSendIcon = getAssetPath("/assets/icons/AI_chat_send_icon.svg");

export default function AiChatInterface({ recordingId }) {
  const { data: session } = useSession();
  const [queryInput, setQueryInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef(null);
  const [activeTab, setActiveTab] = useState("local");

  const [localMessages, setLocalMessages] = useState([]);
  const [isLocalLoading, setIsLocalLoading] = useState(false);
  // Global chat states
  const [globalMessages, setGlobalMessages] = useState([]);
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);


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
    if(activeTab === 'local'){
      setLocalMessages((prev) => [...prev, { id: Date.now(), content, sender }]);
    }
    else{
      setGlobalMessages((prev) => [...prev, { id: Date.now(), content, sender }]);
    }
    // setMessages((prev) => [
    //   ...prev,
    //   {
    //     id: Date.now(),
    //     content,
    //     sender,
    //   },
    // ]);
  };


  const handleSendQueryClick = async () => {
    if (!queryInput.trim() || !recordingId) return;

    const isLocal = activeTab === 'local';
    const setLoading = isLocal ? setIsLocalLoading : setIsGlobalLoading;

    try {
      setIsLoading(true);
      setLoading(true)
      addMessage(queryInput, "user");
      setQueryInput("");

      if(isLocal){
        const response = await AudioService.getAIResponse(
          queryInput,
          recordingId
        );
        console.log("Local AI response",response);
        setLoading(false);
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
      else{
        //global AI chat
        const response = await AudioService.getGlobalAiResponse(queryInput);
        console.log("Global AI response..", response);
        setLoading(false)
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
        }
        else{
          addMessage(
            "Sorry, I encountered an error processing your request.",
            "assistant"
          );
        }
      }

      // if (recordingId) {
      //   const response = await AudioService.getAIResponse(
      //     queryInput,
      //     recordingId
      //   );
      //   console.log(response);
      //   if (response?.ok && response?.status === 200) {
      //     const answer = response?.data?.answer;
      //     if (answer) {
      //       // Add AI response
      //       addMessage(answer, "assistant");
      //     } else {
      //       addMessage(
      //         "Sorry, I encountered an error processing your request.",
      //         "assistant"
      //       );
      //     }
      //   } else {
      //     addMessage(
      //       "Sorry, I encountered an error processing your request.",
      //       "assistant"
      //     );
      //   }
      // }
    } catch (err) {
      console.error("AI api issue", err);
      addMessage(
        "Sorry, I encountered an error processing your request.",
        "assistant"
      );
    } finally {
      setIsLoading(false);
      setLoading(false);
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
      {/* <ScrollArea className="h-64 md:px-2" ref={scrollAreaRef}>
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
                {message.sender === 'user' ? (<TopRightAvatar userName={session?.user?.name} />):(
                  <AiChatAvatar/>
                )}

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
                <AiChatAvatar/>
                <div className="rounded-lg text-sm p-2 bg-gray-800 text-white">
                  Thinking...
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea> */}

      <Tabs defaultValue="local" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="bg-uploadInput-bg">
          <TabsTrigger 
            value="local" 
            className="text-white data-[state=active]:bg-white/10"
          >
            Local Chat
          </TabsTrigger>
          <TabsTrigger 
            value="global" 
            className="text-white data-[state=active]:bg-white/10"
          >
            Global Chat
          </TabsTrigger>
        </TabsList>
        
        <ScrollArea className="h-60 md:px-2" ref={scrollAreaRef}>
          <TabsContent value="local">
            <AiChatMessageBox 
              messages={localMessages} 
              isLoading={isLocalLoading}
              username={session?.user?.name}
            />
          </TabsContent>
          
          <TabsContent value="global">
            <AiChatMessageBox 
              messages={globalMessages}
              isLoading={isGlobalLoading}
              username={session?.user?.name}
            />
          </TabsContent>
        </ScrollArea>
      </Tabs>


      <div className="p-4">
        <div className="flex gap-2">
          <Image src={aiChatBottomIcon} alt="AI chat icon" width={18} height={18} className="drop-shadow-[0_0_8px_rgba(236,72,153,0.7)]"/>
          <Input
            placeholder="Ask your question"
            className="flex-1 bg-uploadInput-bg border-0 text-white placeholder:text-gray-500"
            onChange={handleQueryInputChange}
            value={queryInput}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <Button
            className="w-10 h-10 rounded bg-white flex items-center justify-center hover:bg-white/10 p-0"
            onClick={handleSendQueryClick}
            disabled={isLoading || !queryInput.trim()}
          >
            <Image src={aiChatSendIcon} alt="Send" width={20} height={20}/>
          </Button>
        </div>
      </div>
    </>
  );
}
