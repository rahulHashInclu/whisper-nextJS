import { MoreHorizontal, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";


export default function RecordingTranscript(){

    const messages = [
        {
          id: "1",
          sender: {
            name: "David Shim",
            initials: "DS"
          },
          content: "Hi Jordan, I've been thinking about expanding our services. Do you think there's an untapped market we should explore?",
          timestamp: "[03:24]"
        }
      ]

    return(
        <Card className="w-full max-w-3xl bg-[#1E1E1E] border-0 shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        {/* <h2 className="text-base font-semibold text-white">{recordingId}</h2> */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search transcript</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">More options</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="transcript" className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b border-white/10 bg-transparent p-0">
            <TabsTrigger
              value="transcript"
              className="rounded-none border-b-2 border-transparent px-4 py-2 text-white/70 data-[state=active]:border-white data-[state=active]:text-white data-[state=active]:shadow-none"
            >
              Transcript
            </TabsTrigger>
            <TabsTrigger
              value="minutes"
              className="rounded-none border-b-2 border-transparent px-4 py-2 text-white/70 data-[state=active]:border-white data-[state=active]:text-white data-[state=active]:shadow-none"
            >
              Meeting Minutes
            </TabsTrigger>
            <TabsTrigger
              value="ai-chat"
              className="rounded-none border-b-2 border-transparent px-4 py-2 text-white/70 data-[state=active]:border-white data-[state=active]:text-white data-[state=active]:shadow-none"
            >
              <span className="flex items-center gap-2">
                AI Chat
              </span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="transcript" className="p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="flex items-start gap-3">
                  <Avatar className="h-8 w-8 bg-white/10">
                    <AvatarFallback className="text-sm text-white bg-transparent">
                      {message.sender.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">
                        {message.sender.name}
                      </span>
                      <span className="text-xs text-white/50">{message.timestamp}</span>
                    </div>
                    <div className="rounded-lg bg-[#2A2A2A] p-3">
                      <p className="text-sm text-white">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="minutes" className="p-4">
            <div className="text-sm text-white/70">Meeting minutes content here...</div>
          </TabsContent>
          <TabsContent value="ai-chat" className="p-4">
            <div className="text-sm text-white/70">AI chat content here...</div>
          </TabsContent>
          </Tabs>
        </CardContent>
    </Card>

    )
}