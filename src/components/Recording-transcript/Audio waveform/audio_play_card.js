import { Card, CardContent } from "@/components/ui/card";
import InteractiveAudioWaveform from "./interactive_waveform";

const testAudio = '/assets/test_speech_audio.mp3';

export default function AudioPlayCard(){


    return(
        <Card className="w-full max-w-3xl bg-signupcard-bg border-0 shadow-xl rounded-2xl">
            <CardContent>
                <InteractiveAudioWaveform audioUrl={testAudio}/>
            </CardContent>
        </Card>
        
    )
}