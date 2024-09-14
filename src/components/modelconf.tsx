import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Slider } from "./ui/slider";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { DiscIcon, FrameIcon, MixIcon } from "@radix-ui/react-icons";

const ModelConf = ({
  onValueChange,
  t,
}: {
  onValueChange: (value: number) => void;
  t: number;
}) => {
  const [model, setModel] = useState("");
  const [hoverCard, open] = useState(false);
  useEffect(() => {
    const fetchModel = async () => {
      try {
        const response = await fetch("api", {
          method: "GET",
        });
        let text = await response.text();
        if (!text) {
          text = "Error";
        }
        setModel(text);
      } catch (error) {
        console.error("Error fetching model:", error);
        setModel("Error");
      }
    };

    fetchModel();
  }, []);

  return (
    <div className="grid grid-cols-5 w-full gap-4">
      <HoverCard openDelay={1} closeDelay={50} defaultOpen={hoverCard}>
        <HoverCardTrigger asChild className="col-span-3 2xl:col-span-4">
          <Slider
            defaultValue={[0.7]}
            max={1.5}
            min={0}
            step={0.01}
            className="w-full"
            value={[t]}
            onValueChange={(value) => {
              onValueChange(Number(value[0]));
            }}
            onMouseDown={() => open(true)}
          />
        </HoverCardTrigger>
        <HoverCardContent className="w-60 p-4" side="top">
          <p className="flex gap-1 items-center justify-center ">
            <FrameIcon className="inline" />
            温度: {t}
          </p>
        </HoverCardContent>
      </HoverCard>
      <Badge
        className="text-nowrap overflow-hidden col-span-2 2xl:col-span-1 *:transition-all font-mono"
        variant={
          model ? (model === "Error" ? "destructive" : "secondary") : "outline"
        }
      >
        {model ? model : "正在获取..."}
      </Badge>
    </div>
  );
};

export default ModelConf;
