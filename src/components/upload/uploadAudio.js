import MainPageHeader from "../custom-ui/mainPageHeader"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label"
import UploadMeetUrlInput from "./uploadMeetUrlInput"


export default function UploadAudio(){


    return(
        <div>
            {/* <MainPageHeader /> */}
            <Card className="max-w-2xl bg-signupcard-bg">
                <CardHeader>
                    <CardTitle>Upload New Audio</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                            <Label>Record Audio</Label>
                            <Button>Record</Button>
                        </div>
                        <div>
                            <Label>Connect with</Label>
                            <UploadMeetUrlInput />
                        </div>
                        <Button>Connect</Button>
                    </div>

                    {/* Drag & Drop section */}
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-12 text-center">
            <div className="flex flex-col items-center gap-4">
                {/* <div className="bg-gray-700 p-3 rounded-full">
                    <Upload className="w-6 h-6 text-white" />
                </div> */}
                <p className="text-white text-lg">Drag & Drop or Upload your files</p>
                <Button variant="outline" className="bg-white text-black flex gap-2 hover:bg-gray-100">
                    <img src="/google-drive-icon.png" alt="Google Drive" className="w-5 h-5" />
                    Select from drive
                </Button>
                <Button variant="link" className="text-white underline">
                    Or select a folder
                </Button>
            </div>
        </div>
                </CardContent>
                <CardFooter>
                <div className="flex gap-2 text-gray-400 text-sm mt-4">
            <span>Maximum file size: 5 MB</span>
            <span>|</span>
            <span>Supported format: .MP3, WAV</span>
        </div>

                </CardFooter>
            </Card>
        </div>
    )
}