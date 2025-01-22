import AiChatAvatar from "../custom-ui/AiChatAvatar";
import TopRightAvatar from "../custom-ui/avatar";
import { Alert, AlertDescription } from "../ui/alert";

export default function AiChatMessageBox({ messages, isLoading, username }) {
  return (
    <div className="space-y-3">
      {messages?.length === 0 && (
        <div className="p-4">
          <Alert className="bg-uploadInput-bg border-0">
            <AlertDescription className="text-white">
              Ask your questions about the meeting
            </AlertDescription>
          </Alert>
        </div>
      )}
      {messages?.map((message) => (
        <div
          key={message?.id}
          className={`flex ${
            message?.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`flex gap-3 max-w-[80%] ${
              message?.sender === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {message?.sender === "user" ? (
              <TopRightAvatar userName={username} />
            ) : (
              <AiChatAvatar />
            )}

            <div
              className={`rounded-lg text-sm p-2 ${
                message.sender === "user"
                  ? "bg-uploadInput-bg text-white border border-[#FFFFFF0D]"
                  : "text-white"
              }`}
            >
              {message?.content}
            </div>
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex justify-start">
          <div className="flex gap-3 max-w-[80%]">
            {/* <TopRightAvatar userName={session?.user?.name} /> */}
            <AiChatAvatar />
            <div className="rounded-lg text-sm p-2 bg-uploadInput-bg text-white">
              Thinking...
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
