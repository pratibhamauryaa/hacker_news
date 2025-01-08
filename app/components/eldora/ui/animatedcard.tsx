"use client";
import { ArrowUpRightIcon } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useMouse } from "../hooks/usemouse";
import ShimmerButton from "../../magicui/buttons/ShimmerButton";
import { redirect } from "next/navigation";
// Removed: import { cn } from "@/lib/utils";
export const MainMenusGradientCard = ({
  title,
  description,
  withArrow = false,
  circleSize = 400,
  className = "",
  children,
  url,

}: {
  title: string;
  description: string;
  withArrow?: boolean;
  circleSize?: number;
  children?: ReactNode;
  className?: string;
  url:string;
 
}) => {
  const [mouse, parentRef] = useMouse();

  // Conditionally add opacity classes
  const gradientCircleClasses = [
    "absolute",
    "-translate-x-1/2",
    "-translate-y-1/2",
    "transform-gpu",
    "rounded-full",
    "transition-transform",
    "duration-500",
    "group-hover:scale-[3]",
    mouse.elementX === null || mouse.elementY === null
      ? "opacity-0"
      : "opacity-100",
  ].join(" ");

  // Combine your custom classes for the child container
  const childContainerClasses = [
    "gird",
    "relative",
    "h-40",
    "place-content-center",
    "overflow-hidden",
    "rounded-[15px]",
    "border-white",
    "bg-white/70",
    ,
    className, // Append user-provided className if any
  ].join(" ");

 
const handleRedirect = () =>{

  if(url){
    window.open(url, '_blank')
  }

}

  return (
    <div
      className="group relative transform-gpu overflow-hidden rounded-[20px] bg-white/10 p-2 transition-transform hover:scale-[1.01] active:scale-90"
      ref={parentRef}
      onClick={handleRedirect}
    >
      {withArrow && (
        <ArrowUpRightIcon className="absolute right-2 top-2 z-10 size-5 translate-y-4 text-neutral-700 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 " />
      )}

      {/* Gradient Circle */}
      <div
        className={gradientCircleClasses}
        style={{
          maskImage: `radial-gradient(${circleSize / 2}px circle at center, white, transparent)`,
          width: `${circleSize}px`,
          height: `${circleSize}px`,
          left: `${mouse.elementX}px`,
          top: `${mouse.elementY}px`,
          background:
            "linear-gradient(135deg, #3BC4F2, #7A69F9, #F26378, #F5833F)",
        }}
      />

      <div className="absolute inset-px rounded-[19px] bg-neutral-100/80 " />

      {children && (
        <div className={childContainerClasses}>
          {children}
          {/*  */}
        </div>
      )}

      <div className="relative px-4 pb-2 pt-4">
        <h3 className="text-lg font-semibold text-neutral-800">
          {title}
        </h3>
        <div  style={{ justifyContent: 'space-between', display:'flex'}}>
        <p className="mt-2 text-neutral-600 ">
          {description}
        </p>
        <ShimmerButton >
   
         <a href={url}>Read</a>
       
      </ShimmerButton>
        {/* <a href={url}>Read Post</a> */}
        </div>
       
      </div>
    </div>
  );
};
