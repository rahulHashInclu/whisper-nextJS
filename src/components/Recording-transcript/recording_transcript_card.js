'use client'

import { MoreHorizontal, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import TranscriptTabContents from "./transcript_tabcontent";
import { useEffect, useState } from "react";
import { AudioService } from "@/lib/audioService";
import AiChatInterface from "./ai_chat_tabcontent";
import MeetingMinutes from "./meeting_minutes_tabcontent";
import { getAssetPath } from "@/lib/utils";

const AI_chat_icon = getAssetPath('/assets/icons/AI_chat_icon.svg');

const tabs_trigger_style = "border-b-2 border-transparent data-[state=active]:border-b-white data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=active]:text-white";


export default function RecordingTranscript({recordingId, onTimelineUpdate, transcriptFetchData, transcriptFetchingError}) {

    const [fetchedTranscriptionData, setFetchedTranscriptionData] = useState({});

    if(transcriptFetchData){
      console.log('Transcript fetch data...', transcriptFetchData);
    }

    const handleDataUpdate = (apiData) => {
      const segments = apiData?.result;
      // Get total duration from last segments end_time
      const totalDuration = segments && segments.length > 0 
        ? segments[segments.length - 1].end_time 
        : 0;
    
      const timelineData ={
          segments: segments,
          numSpeakers: apiData?.num_speakers, // or however you determine this
          speakersList: apiData?.speaker_list,
          totalDuration: totalDuration,
          jsonPath: apiData?.json_file
        };
        console.log('Timeline data from recording transcript...', timelineData);
        onTimelineUpdate(timelineData);
    };
    
    

    const fetchAudioTranscriptions = async () => {
        try{
            if(recordingId){
                const response = await AudioService.getTranscriptions(recordingId.toString());
                console.log('Fteched transcriptions..', response);
                if(response?.ok && response?.status === 200){
                  setFetchedTranscriptionData(response?.data?.result);
                  handleDataUpdate(response?.data?.result)
                }
                else{
                  console.log('Couldnt fetch transcriptions');
                  setFetchedTranscriptionData({ result: [] });
                }
            }
        }
        catch(err){
          setFetchedTranscriptionData({ result: [] });
          console.error('Failed to fetch transcriptions...', err);
        }
    }

    // useEffect(()=>{
    //   fetchAudioTranscriptions();
    // }, [recordingId])
  

  return (
    <Card className="w-full max-w-3xl bg-signupcard-bg border-0 shadow-xl rounded-2xl max-h-[70vh]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <h2 className="text-base font-semibold text-white">
          {/* {fetchedTranscriptionData?.recordingname ? fetchedTranscriptionData?.recordingname : 'Loading...'} */}
          {transcriptFetchData?.recordingname ? transcriptFetchData?.recordingname : 'Loading...'}
        </h2>
        <div className="flex items-center gap-2">
          {/* <Button
            variant="ghost"
            size="icon"
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <Search className="h-4 w-4" />
          </Button> */}
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
              <span><img src={AI_chat_icon} alt="aiChatIcon" className="pr-1"/></span>AI Chat
            </TabsTrigger>
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
