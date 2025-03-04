import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";

const ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => (
    <ScrollAreaPrimitive.Root
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        {...props}
    >
        <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
            {children}
        </ScrollAreaPrimitive.Viewport>
        <ScrollAreaPrimitive.Scrollbar
            className="flex touch-none select-none transition-colors duration-150 hover:bg-gray-100 p-0.5 vertical:horizontal:w-2 vertical:w-2.5 horizontal:flex-col horizontal:h-2.5"
            orientation="vertical"
        >
            <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-lg bg-gray-300 hover:bg-blue-500 transition-colors duration-200" />
        </ScrollAreaPrimitive.Scrollbar>
        <ScrollAreaPrimitive.Scrollbar
            className="flex touch-none select-none transition-colors duration-150 hover:bg-gray-100 p-0.5 vertical:horizontal:w-2 vertical:w-2.5 horizontal:flex-col horizontal:h-2.5"
            orientation="horizontal"
        >
            <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-lg bg-gray-300 hover:bg-blue-500 transition-colors duration-200" />
        </ScrollAreaPrimitive.Scrollbar>
        <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

export { ScrollArea };