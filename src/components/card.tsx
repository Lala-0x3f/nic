import React, { useRef, useState } from "react";
import { Button } from "./ui/button"; // 假设你已经安装了shadcn/ui库
import html2canvas from "html2canvas"; // 用于截图的库
import { toast } from "sonner";
const fallbackImage = "/images/fallback.png"; // 你的fallback图片路径

interface SvgRendererProps {
  svgContent?: string; // 可选的SVG内容
}

const SvgRenderer: React.FC<SvgRendererProps> = ({ svgContent }) => {
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!svgContainerRef.current) return;
    setIsDownloading(true);

    // 使用 html2canvas 捕捉 DOM 元素截图
    const canvas = await html2canvas(svgContainerRef.current);
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "screenshot.png";
    link.click();

    setIsDownloading(false);
  };

  const handleCopyImage = async () => {
    if (!svgContainerRef.current) return;

    // 使用 html2canvas 捕捉 DOM 元素截图
    const canvas = await html2canvas(svgContainerRef.current);
    canvas.toBlob((blob) => {
      if (blob) {
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard
          .write([item])
          .then(() => {
            toast("Image copied to clipboard!");
          })
          .catch((err) => {
            toast.error("Failed to copy image: ", err);
          });
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div>
        {svgContent ? (
          <div className="flex flex-col items-center justify-center w-full h-full max-w-lg max-h-96 ">
            <div
              ref={svgContainerRef}
              dangerouslySetInnerHTML={{ __html: svgContent.replaceAll(/```|```svg/g,"") }}
              className="max-w-full max-h-full"
            />
            <div className="grid grid-cols-2 gap-2 my-4">
              <Button onClick={handleCopyImage}>复制图片</Button>
              <Button
                onClick={handleDownload}
                disabled={isDownloading}
              >
                {isDownloading ? "正在下载..." : "下载图片"}
              </Button>
            </div>
          </div>
        ) : (
          <img
            src={fallbackImage}
            alt="Fallback"
            className="max-w-full max-h-full"
          />
        )}
      </div>
    </div>
  );
};

export default SvgRenderer;
