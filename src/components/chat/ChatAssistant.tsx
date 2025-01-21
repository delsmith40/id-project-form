import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import { ChatDialog } from "./ChatDialog";
import { useToast } from "@/components/ui/use-toast";

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const [serverUrl, setServerUrl] = useState("");

  const handleServerUrlSubmit = (url: string) => {
    setServerUrl(url);
    toast({
      title: "Connected to Ollama",
      description: "You can now use the chat assistant",
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl w-[380px] h-[600px] flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="font-semibold">AI Assistant</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <ChatDialog apiKey={serverUrl} onApiKeySubmit={handleServerUrlSubmit} />
        </div>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-12 h-12 shadow-lg bg-primary hover:bg-primary/90"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}