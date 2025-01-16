'use client'

import { MoreHorizontal, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import TranscriptTabContents from "./transcript_tabcontent";
import { useEffect, useState } from "react";
import { AudioService } from "@/lib/audioService";
import AiChatInterface from "./ai_chat_tabcontent";


const tabs_trigger_style = "border-b-2 border-transparent data-[state=active]:border-b-white data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=active]:text-white";

// pass the following as props
// recording_id, recording_name
export default function RecordingTranscript({recordingId}) {

    const [fetchedTranscriptionData, setFetchedTranscriptionData] = useState({});

    const fetchAudioTranscriptions = async () => {
        try{
            if(recordingId){
                const response = await AudioService.getTranscriptions(recordingId.toString());
                console.log('Fteched transcriptions..', response);
                if(response?.ok && response?.status === 200){
                  setFetchedTranscriptionData(response?.data?.result);
                }
                else{
                  console.log('Couldnt fetch transcriptions');
                }
            }
        }
        catch(err){
          console.error('Failed to fetch transcriptions...', err);
        }
    }

    useEffect(()=>{
      fetchAudioTranscriptions();
    }, [recordingId])
  
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
    <Card className="w-full max-w-3xl bg-signupcard-bg border-0 shadow-xl rounded-2xl max-h-[70vh]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <h2 className="text-base font-semibold text-white">
          {fetchedTranscriptionData?.recordingname ? fetchedTranscriptionData?.recordingname : 'Loading...'}
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
      <CardContent className="p-2 flex-1 min-h-0">
        <Tabs defaultValue="transcript" className="w-full h-full">
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
          <TabsContent value="transcript" className="p-4 h-full overflow-hidden">
            <TranscriptTabContents messages={messages} recordingId={recordingId} transcriptionContent={fetchedTranscriptionData}/>
          </TabsContent>
          <TabsContent value="minutes" className="p-4 h-[calc(100%-3rem)]">
            <div className="text-sm text-white/70">
              Meeting minutes content here...
            </div>
          </TabsContent>
          <TabsContent value="ai-chat" className="p-4">
            {/* <div className="text-sm text-white/70">AI chat content here...</div> */}
            <AiChatInterface />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
