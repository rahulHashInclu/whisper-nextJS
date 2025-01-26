
'use client';

import { useEffect, useState } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AudioService } from '@/lib/audioService';

export default function MeetingMinutes({ recordingId }) {
  const [minutesData, setMinutesData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // polling to listen for getMeetingMinutes once generateMeetingMinutes is called
  const pollMeetingMinutes = async () => {
    const maxAttempts = 5;
    const interval = 3000;
    let attempts = 0;
  
    while (attempts < maxAttempts) {
      const success = await getMeetingMinutes();
      if (success) return;
  
      attempts++;
      await new Promise(resolve => setTimeout(resolve, interval));
    }
  
    setError('Fetching meeting minutes failed. Please try again later.');
    setIsLoading(false);
  };
  


  const getMeetingMinutes = async () => {
    try{
        if (recordingId) {
            const response = await AudioService.getMeetingMinutes(recordingId.toString());
            console.log('Fetched meeting minutes...', response);
            if (response?.ok && response?.status === 200) {
              setMinutesData(response?.data?.meeting_minutes);
              setIsLoading(false); // Only stop loading when we get the data
              return true;
            }
            return false;
          }    
    }
    catch(err){
      console.error('Failed to get meeting minutes', err);
      setError('Failed to get meeting minutes');
      setIsLoading(false);
      return false
    }
  }

  const generateMeetingMinutes = async () => {
    setIsLoading(true);
    try{
        if(recordingId){
            const response = await AudioService.generateMeetingMinutes(recordingId.toString());
            console.log('Meeting minutes generated...', response);
            if(response?.ok && response?.status === 200 && response?.data?.status === "success"){
                await pollMeetingMinutes();
            }
            else{
                console.log('Couldnt generate meeting minutes');
                throw new Error('Couldnt generate meeting minutes');
            }
        }
    }
    catch(err){
        console.error('Failed to generate meeting minutes', err);
        setError('Failed to generate meeting minutes');
        setIsLoading(false);
    }
  }

  useEffect(() => {
    const initializeMeetingMinutes = async () => {
      if(!recordingId){
        return
      }
      setIsLoading(true);
      const meetingMinutesExist = await getMeetingMinutes();

      if(!meetingMinutesExist){
        await generateMeetingMinutes(); // generate meeting minutes only if meeting minutes not available
      }
    }

    initializeMeetingMinutes();

  }, [recordingId]);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }


  return (
    <ScrollArea className="h-72 w-full">
      <div className="space-y-6">
        {/* Attendees Section */}
        <section>
          <h5 className="text-lg font-semibold text-white mb-4">Attendees</h5>
          <div className="flex flex-wrap gap-2">
            {isLoading ? (
              <div className="flex gap-2">
                <Skeleton className="h-8 w-24 bg-[#FFFFFF0D]" />
                <Skeleton className="h-8 w-24 bg-[#FFFFFF0D]" />
              </div>
            ) : (
              minutesData?.attendees?.map((attendee, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="bg-[#FFFFFF0D] text-white border-gray-700 flex items-center gap-2"
                >
                  {attendee}
                </Badge>
              ))
            )}
          </div>
        </section>

        {/* Key Events Section */}
        <section>
          <h5 className="text-lg font-semibold text-white mb-4">Key Events</h5>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-8 w-full bg-[#FFFFFF0D]" />
            </div>
          ) : (
            <Card className="bg-[#FFFFFF0D] border-gray-700 p-4">
            {minutesData?.key_events?.length > 0 ? (
                <ul className="list-disc pl-6 space-y-2 text-white">
              {minutesData?.key_events?.map((action, index) => (
                <li key={index}>{action}</li>
              ))}
            </ul>
            ) : (
                <p className="text-white">No Next Actions</p>
            )}
            </Card>
          )}
        </section>

        {/* Meeting Introduction */}
        <section>
          <h5 className="text-lg font-semibold text-white mb-4">Meeting Introduction</h5>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-20 w-full bg-[#FFFFFF0D]" />
            </div>
          ) : (
            <Card className="bg-[#FFFFFF0D] border-gray-700 p-4">
              <p className="text-white">{minutesData?.starts_with || 'No introduction available'}</p>
            </Card>
          )}
        </section>

        {/* Conclusions */}
        <section>
          <h5 className="text-lg font-semibold text-white mb-4">Conclusions</h5>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-24 w-full bg-[#FFFFFF0D]" />
            </div>
          ) : (
            <Card className="bg-[#FFFFFF0D] border-gray-700 p-4">
              <p className="text-white">{minutesData?.conclusions || 'No conclusions available'}</p>
            </Card>
          )}
        </section>

        {/* Next Actions */}
        <section>
          <h5 className="text-lg font-semibold text-white mb-4">Next Actions</h5>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-8 w-full bg-[#FFFFFF0D]" />
            </div>
          ) : (
            <Card className="bg-[#FFFFFF0D] border-gray-700 p-4">
            {minutesData?.next_actions?.length > 0 ? (
                <ul className="list-disc pl-6 space-y-2 text-white">
              {minutesData?.next_actions?.map((action, index) => (
                <li key={index}>{action}</li>
              ))}
            </ul>
            ) : (
                <p className="text-white">No Next Actions</p>
            )}
            </Card>
          )}
        </section>

        {/* Promises Given */}
        <section>
          <h5 className="text-lg font-semibold text-white mb-4">Promises Given</h5>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-8 w-full bg-[#FFFFFF0D]" />
            </div>
          ) : (
            <Card className="bg-[#FFFFFF0D] border-gray-700 p-4">
            {minutesData?.promises_given?.length > 0 ? (
                <ul className="list-disc pl-6 space-y-2 text-white">
              {minutesData?.promises_given?.map((action, index) => (
                <li key={index}>{action}</li>
              ))}
            </ul>
            ) : (
                <p className="text-white">No promises given</p>
            )}
            </Card>
          )}
        </section>

        {/* Summary */}
        <section>
          <h5 className="text-base font-semibold text-white mb-4">Summary</h5>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-24 w-full bg-[#FFFFFF0D]" />
            </div>
          ) : (
            <Card className="bg-[#FFFFFF0D] border-gray-700 p-4">
              <p className="text-white">{minutesData?.summary || 'No Summary available'}</p>
            </Card>
          )}
        </section>
      </div>
    </ScrollArea>
  );
}