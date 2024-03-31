import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FiFacebook, FiInstagram, FiVoicemail } from "react-icons/fi";

export function SharePopup({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}) {
  let url = "";
  if (typeof window !== "undefined") {
    url = window.location.href;
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          setOpen(open);
        }
      }}
    >
      <DialogContent className="bg-black text-white transition-all ease-in-out duration-200">
        <DialogHeader className="flex justify-between items-center">
          <span className="text-xl text-magenta font-semibold mb-5">Share</span>
        </DialogHeader>
        <div className="flex-col text-center items-center justify-center p-8">
          <p>Share this link via</p>
          <ul className="flex justify-center gap-3 items-center">
            <a
              href="#"
              className="flex items-center justify-center h-12 w-12 text-lg border-magenta hover:border-2 transition-all duration-100"
            >
              <FiFacebook />
            </a>
            <a
              href="#"
              className="flex items-center justify-center h-12 w-12 text-lg border-magenta hover:border-2 transition-all duration-100"
            >
              <FiInstagram />
            </a>
            <a
              href="#"
              className="flex items-center justify-center h-12 w-12 text-lg border-magenta hover:border-2 transition-all duration-100"
            >
              <FiVoicemail />
            </a>
          </ul>
        </div>
        <div className="flex items-center h-10">
          <p className="text-nowrap">Or copy link</p>
          <Input
            type="text"
            value={url}
            className="w-full h-full text-sm bg-white text-black ms-2"
          />
          <button className="h-full text-black px-4 py-1 bg-magenta hover:bg-yellow">
            Copy
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
