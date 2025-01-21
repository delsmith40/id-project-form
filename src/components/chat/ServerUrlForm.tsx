import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ServerUrlFormProps {
  serverUrl: string;
  onServerUrlChange: (url: string) => void;
  onSubmit: (url: string) => void;
}

export function ServerUrlForm({ serverUrl, onServerUrlChange, onSubmit }: ServerUrlFormProps) {
  return (
    <div className="p-4 space-y-4">
      <p className="text-sm text-muted-foreground">
        Please enter your Ollama server URL (e.g., http://localhost:11434):
      </p>
      <Input
        type="text"
        value={serverUrl}
        onChange={(e) => onServerUrlChange(e.target.value)}
        placeholder="Enter server URL"
      />
      <Button
        className="w-full"
        onClick={() => onSubmit(serverUrl)}
        disabled={!serverUrl}
      >
        Connect
      </Button>
    </div>
  );
}