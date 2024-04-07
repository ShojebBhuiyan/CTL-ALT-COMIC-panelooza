import { saveRenderedScenes } from "@/actions/render/save-rendered-scenes";
import { useStore } from "@/components/render/store";
import { toast } from "@/components/ui/use-toast";
import html2canvas from "html2canvas";
import { useState } from "react";
import { SharePopup } from "./share-popup";

export function Buttons() {
  const renderedScenes = useStore((state) => state.renderedScenes);

  const exportImage = async () => {
    const componentRef = document.getElementById("page");

    if (componentRef) {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const canvas = await html2canvas(componentRef);
      const imgData = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = imgData;
      downloadLink.download = "panel.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const saveWorkspace = async () => {
    let url = "";
    if (typeof window !== "undefined") {
      const t = new URL(window.location.href);
      url = t.pathname.split("/").pop() || "";
    }

    console.log("Saving workspace", renderedScenes);
    saveRenderedScenes(Object.values(renderedScenes), url)
      .then(() => {
        toast({
          variant: "default",
          title: "Workspace saved",
          description: " ",
        });
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: " ",
        });
      });
  };

  const [isOpen, setOpen] = useState(false);

  return (
    <div className="flex justify-end mb-4 space-x-2">
      <button className="bg-black hover:bg-gray-700 text-white px-4 py-2" onClick={saveWorkspace}>
        Save
      </button>
      <button className="bg-black hover:bg-gray-700 text-white px-4 py-2" onClick={exportImage}>
        Export
      </button>
      <button
        className="bg-black hover:bg-gray-700 text-white px-4 py-2"
        onClick={() => window.print()}
      >
        Print
      </button>
      <button
        className="bg-black hover:bg-gray-700 text-white px-4 py-2"
        onClick={() => setOpen(true)}
      >
        Share
      </button>
      <SharePopup isOpen={isOpen} setOpen={setOpen} />
    </div>
  );
}
