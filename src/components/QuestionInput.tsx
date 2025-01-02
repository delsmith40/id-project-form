import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface QuestionInputProps {
  id: string;
  text: string;
  value: string;
  onChange: (id: string, value: string) => void;
}

export function QuestionInput({ id, text, value, onChange }: QuestionInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-base">
        {text}
      </Label>
      <Textarea
        id={id}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        className="min-h-[100px] resize-y"
        placeholder="Enter your answer here..."
      />
    </div>
  );
}