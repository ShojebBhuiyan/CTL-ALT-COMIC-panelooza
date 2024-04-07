import { useStore } from "@/components/render/store";
import { VerticalSlider } from "@/components/ui/vertical-slider";
import { cn } from "@/lib/utils";

export function Zoom() {
  const zoomLevel = useStore((state) => state.zoomLevel);
  const setZoomLevel = useStore((state) => state.setZoomLevel);
  const isGeneratingStory = useStore((state) => state.isGeneratingStory);

  return (
    <div
      className={cn(
        `flex flex-col items-center mr-12 mt-28 print:hidden`,
        `animation-all duration-300 ease-in-out`,
        isGeneratingStory ? `scale-0 opacity-0` : ``
      )}
    >
      <div className="w-2">
        <VerticalSlider
          defaultValue={[zoomLevel]}
          min={30}
          max={250}
          step={1}
          onValueChange={(value) => setZoomLevel(value[0] || 10)}
          value={[zoomLevel]}
          className="h-64 md:h-80"
          orientation="vertical"
        />
      </div>
    </div>
  );
}
