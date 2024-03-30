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
      <DialogContent className="bg-white text-black transition-all ease-in-out duration-200">
        <DialogHeader className="flex justify-between items-center">
          <span className="text-lg font-semibold">Share</span>
        </DialogHeader>
        <div className="mt-1 flex-col text-center items-center justify-center">
          <p>Share this link via</p>
          <ul className="flex justify-center gap-3 items-center">
            <a
              href="#"
              className="flex items-center justify-center h-12 w-12 text-lg border-blue hover:border-2 transition-all duration-100"
            >
              <FiFacebook />
            </a>
            <a
              href="#"
              className="flex items-center justify-center h-12 w-12 text-lg border-blue hover:border-2 transition-all duration-100"
            >
              <FiInstagram />
            </a>
            <a
              href="#"
              className="flex items-center justify-center h-12 w-12 text-lg border-blue hover:border-2 transition-all duration-100"
            >
              <FiVoicemail />
            </a>
          </ul>
        </div>
        <div className="flex items-center h-fit">
          <p className="text-nowrap">Or copy link</p>
          <Input
            type="text"
            value={url}
            className="w-full border-2 text-sm bg-white ms-2"
          />
          <button className="h-10 text-white px-4 py-1 bg-blue-secondary hover:bg-green-secondary">
            Copy
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
