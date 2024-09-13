"use client";
import SvgRenderer from "@/components/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const api = "api";
// const api = "test";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [svgContent, setSvgContent] = useState("");
  const genrateSvg = async (input: string) => {
    const Promise = fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: input,
    });

    toast.promise(Promise, {
      loading: "生成中...",
      success: async (data) => {
        const output = await data.text();
        setSvgContent(output);
        console.log(output);
        return `${input} 生成成功`;
      },
      error: (error) => {
        return `生成失败 \n ${error}`;
      },
    });
    return new Response(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue) {
      genrateSvg(inputValue);
      // setSvgContent(testsvg);
    }
  };
  return (
    <div className="m-4 mx-8 md:mx-20">
      <div className=" gap-8 m-auto grid md:grid-cols-5">
        <div className="*:mt-4 md:col-span-3">
          <h1 className="text-7xl font-serif">汉语新解</h1>
          <p>给一个中文词汇，就生成一张精美的卡片，并且略带讽刺精美的解读。</p>
          <Input
            className="w-full text-xl h-16"
            placeholder="给一个中文词汇"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="grid grid-cols-7 gap-4">
            <Button
              variant="secondary"
              onClick={() => {
                let i = inputValue;
                setInputValue("");
                toast("已清除输入", {
                  action: {
                    label: "撤销",
                    onClick: () => setInputValue(i),
                  },
                });
              }}
            >
              清除
            </Button>
            <Button
              className="w-full col-span-6"
              type="submit"
              onClick={async () => {
                if (inputValue) {
                  await genrateSvg(inputValue);
                } else {
                  toast.error("请输入一个中文词汇");
                }
              }}
            >
              生成 ↗
            </Button>
          </div>
        </div>
        <div className="max-h-screen md:col-span-2">
          <SvgRenderer svgContent={svgContent}></SvgRenderer>
        </div>
      </div>
    </div>
  );
}
