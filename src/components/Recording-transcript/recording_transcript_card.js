import { MoreHorizontal, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import TranscriptTabContents from "./transcript_tabcontent";


const tabs_trigger_style = "border-b-2 border-transparent data-[state=active]:border-b-white data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=active]:text-white";

// pass the following as props
// recording_id, recording_name
export default function RecordingTranscript() {
  const messages = [
    {
      id: "1",
      sender: {
        name: "David Shim",
        initials: "DS",
      },
      content:
        "Hi Jordan, I've been thinking about expanding our services. Do you think there's an untapped market we should explore?",
      timestamp: "[03:24]",
    },
  ];

  return (
    <Card className="w-full max-w-3xl bg-signupcard-bg border-0 shadow-xl rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <h2 className="text-base font-semibold text-white">
          Recording 0010456
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <Search className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">More options</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-2">
        <Tabs defaultValue="transcript" className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b border-white/10 bg-transparent p-0 gap-4">
            <TabsTrigger value="transcript" className={tabs_trigger_style}>
              Transcript
            </TabsTrigger>
            <TabsTrigger value="minutes" className={tabs_trigger_style}>
              Meeting Minutes
            </TabsTrigger>
            <TabsTrigger value="ai-chat" className={tabs_trigger_style}>
              AI Chat
            </TabsTrigger>
          </TabsList>
          <TabsContent value="transcript" className="p-4">
            <TranscriptTabContents messages={messages} />
          </TabsContent>
          <TabsContent value="minutes" className="p-4">
            <div className="text-sm text-white/70">
              Meeting minutes content here...
            </div>
          </TabsContent>
          <TabsContent value="ai-chat" className="p-4">
            <div className="text-sm text-white/70">AI chat content here...</div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}