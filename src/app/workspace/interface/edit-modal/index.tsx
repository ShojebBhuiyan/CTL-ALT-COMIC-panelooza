import { ReactNode, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Textarea } from "@/components/ui/textarea";

export function EditModal({
  existingPrompt,
  isEnabled,
  className,
  children,
  onSave,
}: {
  existingPrompt: string;
  isEnabled: boolean;
  className?: string;
  children?: ReactNode;
  onSave: (newPrompt: string) => void;
}) {
  const [draftPrompt, setDraftPrompt] = useState(existingPrompt);
  const [isOpen, setOpen] = useState(false);

  const handleSubmit = () => {
    if (draftPrompt) {
      onSave(draftPrompt);
      setOpen(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open || isEnabled) {
          setOpen(open);
          if (!open) {
            setDraftPrompt(existingPrompt);
          }
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-green-secondary rounded-none border-2 text-black">
        <DialogHeader>
          <DialogDescription className="w-full text-center text-xl font-bold text-black">
            Finetune Prompt
          </DialogDescription>
        </DialogHeader>
        <Textarea
          placeholder="Story"
          rows={10}
          className="w-full bg-white text-black rounded-none"
          onChange={(e) => {
            setDraftPrompt(e.target.value);
          }}
          onKeyDown={({ key }) => {
            if (key === "Enter") {
              handleSubmit();
            }
          }}
          value={draftPrompt}
        />
        <DialogFooter>
          <Button
            type="button"
            className="bg-red rounded-none drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] text-black hover:bg-yellow"
            onClick={() => {
              setOpen(false);
              setDraftPrompt(existingPrompt);
            }}
          >
            cancel
          </Button>
          <Button
            type="submit"
            className="bg-green rounded-none drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] text-black hover:bg-yellow"
            onClick={() => handleSubmit()}
            disabled={!draftPrompt.length}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
