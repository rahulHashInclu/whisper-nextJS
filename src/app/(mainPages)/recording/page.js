import AudioPlayCard from "@/components/Recording-transcript/Audio waveform/audio_play_card"
import RecordingTranscript from "@/components/Recording-transcript/recording_transcript_card"

export default function RecordingDetailsPage(){

    return(
        <div className="h-full flex flex-col justify-start py-4 gap-4 items-center px-2 md:px-0">
            <AudioPlayCard />
            <RecordingTranscript />
        </div>
    )
}