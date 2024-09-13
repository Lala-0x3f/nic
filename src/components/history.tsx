"use client";
import { useState, useEffect } from "react";
import { getHistory, delHistory } from "@/lib/storage";
import SvgRenderer from "./card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { toast } from "sonner";
import { Button } from "./ui/button";
const GenerateHistory = () => {
  const [history, setHistory] = useState<{ i: string; o: string }[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);
  if (history.length === 0) {
    return <div>没有历史记录</div>;
  } else if (history.map) {
    return (
      <>
        <hr />
        <div className="flex items-center gap-4 my-4">
          <h2 className="font-semibold">历史记录</h2>
          <Button
            disabled={getHistory().length === 0}
            variant="destructive"
            onClick={() => {
              delHistory();
              setHistory([]);
              toast.info("已清空历史记录");
            }}
            size={"sm"}
          >
            清空
          </Button>
        </div>
        <div className="grid grid-cols-3 md:flex gap-4 md:overflow-x-scroll md:overflow-y-clip md:h-48">
          {history.map((item, index) => {
            return (
              <Dialog key={index}>
                <div className="scale-[0.25] origin-top-right w-[100px] h-[150px] -left-[50px] relative select-none">
                  <DialogTrigger>
                    <SvgRenderer svgContent={item.o} minimized />
                  </DialogTrigger>
                  <DialogContent className="bg-white max-h-[90vh] ">
                    <DialogHeader>
                      <DialogTitle>{item.i}</DialogTitle>
                    </DialogHeader>
                    <div className="h-[80vh] overflow-y-scroll ">
                      <SvgRenderer svgContent={item.o} />
                    </div>
                  </DialogContent>
                </div>
              </Dialog>
            );
          })}
        </div>
      </>
    );
  }
};

export default GenerateHistory;
