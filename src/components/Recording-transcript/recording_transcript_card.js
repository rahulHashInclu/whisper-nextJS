'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardHeader, CardContent } from "../ui/card";
import TranscriptTabContents from "./transcript_tabcontent";
import AiChatInterface from "./ai_chat_tabcontent";
import MeetingMinutes from "./meeting_minutes_tabcontent";
import { getAssetPath } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

const AI_chat_icon = getAssetPath('/assets/icons/AI_chat_icon.svg');

const tabs_trigger_style = "border-b-2 border-transparent data-[state=active]:border-b-white data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=active]:text-white";


export default function RecordingTranscript({recordingId, onTimelineUpdate, transcriptFetchData, transcriptFetchingError, embeddingCompleted}) {

    if(transcriptFetchData){
      console.log('Transcript fetch data...', transcriptFetchData);
    }


  return (
    <Card className="w-full max-w-3xl bg-signupcard-bg border-0 shadow-xl rounded-2xl max-h-[70vh]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <h2 className="text-base font-semibold text-white">
          {transcriptFetchData?.recordingname ? transcriptFetchData?.recordingname : 'Loading...'}
          {/* {transcriptFetchData?.recordingname && transcriptFetchData?.recordingname}
          {!transcriptFetchingError && !transcriptFetchData?.recordingname ? 'Loading...' : 'No recording name found'} */}
        </h2>
        <div className="flex items-center gap-2">
          {/* <Button
            variant="ghost"
            size="icon"
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <Search className="h-4 w-4" />
          </Button> */}
          {/* <Button
            variant="ghost"
            size="icon"
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">More options</span>
          </Button> */}
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
            <div className="relative">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                <div>
                <TabsTrigger value="ai-chat" className={tabs_trigger_style} disabled={!embeddingCompleted}>
                  <span><img src={AI_chat_icon} alt="aiChatIcon" className="pr-1"/></span>AI Chat
                </TabsTrigger>
                </div>
                </TooltipTrigger>
                {!embeddingCompleted && (
                  <TooltipContent>
                    <p>Embedding not completed. Once completed, AI chat will be enabled</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
            </div>
          </TabsList>
          <TabsContent value="transcript" className="p-4 h-full overflow-hidden">
            {/* <TranscriptTabContents recordingId={recordingId} transcriptionContent={fetchedTranscriptionData}/> */}
            <TranscriptTabContents recordingId={recordingId} transcriptionContent={transcriptFetchData} transcriptFetchingError={transcriptFetchingError}/>
          </TabsContent>
          <TabsContent value="minutes" className="p-4 h-[calc(100%-3rem)]">
            <MeetingMinutes recordingId={recordingId}/>
          </TabsContent>
          <TabsContent value="ai-chat" className="p-4">
            <AiChatInterface recordingId={recordingId}/>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
