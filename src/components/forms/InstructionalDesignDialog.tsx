import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FilePlus } from "lucide-react";
import { InstructionalDesignForm } from "./InstructionalDesignForm";
import { useState } from "react";

export function InstructionalDesignDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="mb-8 text-xl py-8 px-12 shadow-lg hover:scale-105 transition-transform duration-200 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          <FilePlus className="mr-2 h-6 w-6" />
          Project Request
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <InstructionalDesignForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}