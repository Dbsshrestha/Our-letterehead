import React from "react";
import { FaHandshakeSimple } from "react-icons/fa6";
import { TiArrowLoop } from "react-icons/ti";
import { BsImages } from "react-icons/bs";
import { CardTick, Box1 } from "iconsax-react";

function DesignCard() {
  return (
    <div className="mt-[3rem] text-[#22092C]">
      <h1 className="text-[24px] text-center font-semibold mb-4">
        Design Tips and Best Practices
      </h1>
      <div className="grid grid-cols-3 gap-4">
        {designTips.map((tip, i) => (
          <div
            key={i}
            className="mb-2 flex flex-col items-center p-4 text-center text-[#22092C] shadow-md"
          >
            {tip.icon === "icon-for-keep-it-simple" && (
              <FaHandshakeSimple color="#FF8A65" size={28} />
            )}
            {tip.icon === "icon-for-high-quality-images" && (
              <BsImages color="#FF8A65" size={28} />
            )}
            {tip.icon === "icon-for-consistency-is-key" && (
              <CardTick size="32" color="#FF8A65" variant="Bold" />
            )}
            {tip.icon === "icon-for-consider-different-formats" && (
              <Box1 size="32" color="#FF8A65" variant="Bold" />
            )}
            {tip.icon === "icon-for-test-and-iterate" && (
              <TiArrowLoop color="#FF8A65" size={28} />
            )}
            <h1 className="font-semibold p-2">{tip.title}</h1>
            <p className="text-[14px] opacity-90">{tip.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DesignCard;

const designTips = [
  {
    title: "Keep it Simple",
    content: "Avoid clutter; prioritize clarity and elegance.",
    icon: "icon-for-keep-it-simple",
  },
  {
    title: "Consistency is Key",
    content:
      "Maintain Brand Harmony. Ensure coherence across all branding elements for recognition.",
    icon: "icon-for-consistency-is-key",
  },
  {
    title: "Use High-Quality Images",
    content: "Opt for sharp, relevant visuals to enhance brand impact.",
    icon: "icon-for-high-quality-images",
  },
  {
    title: "Consider Different Formats",
    content: "Explore digital and print options for versatile communication.",
    icon: "icon-for-consider-different-formats",
  },
  {
    title: "Test and Iterate",
    content: "Collect feedback iteratively to polish your design effectively.",
    icon: "icon-for-test-and-iterate",
  },
];
