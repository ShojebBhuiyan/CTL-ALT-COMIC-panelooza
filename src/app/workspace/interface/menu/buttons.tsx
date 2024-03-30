import html2canvas from "html2canvas";
import { useState } from "react";
import { SharePopup } from "./share-popup";

export function Buttons() {
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

  const [isOpen, setOpen] = useState(false);

  return (
    <div className="flex justify-end mb-4 space-x-2">
      <button className="bg-black text-white px-4 py-2">Save</button>
      <button className="bg-black text-white px-4 py-2" onClick={exportImage}>
        Export
      </button>
      <button
        className="bg-black text-white px-4 py-2"
        onClick={() => window.print()}
      >
        Print
      </button>
      <button
        className="bg-black text-white px-4 py-2"
        onClick={() => setOpen(true)}
      >
        Share
      </button>
      <SharePopup isOpen={isOpen} setOpen={setOpen} />
    </div>
  );
}
