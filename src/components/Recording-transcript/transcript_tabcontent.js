'use client'
import { Avatar, AvatarFallback } from "../ui/avatar";



export default function TranscriptTabContents({messages}){

    return(
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
                            <div className="rounded-lg bg-[#FFFFFF0D] p-3">
                              <p className="text-sm text-white">{message.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
    )
}