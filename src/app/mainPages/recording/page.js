import AudioPlayCard from "@/components/Recording-transcript/Audio waveform/audio_play_card"
import RecordingTranscript from "@/components/Recording-transcript/recording_transcript_card"

export default function RecordingDetailsPage(){

    return(
        <div className="h-full flex flex-col justify-center items-center">
            <AudioPlayCard />
            <RecordingTranscript />
        </div>
    )
}