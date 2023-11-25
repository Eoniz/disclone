"use client";

import React from 'react';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

interface ActionTooltipProps {
    align: "center" | "start" | "end";
    side: "top" | "right" | "bottom" | "left";
    label: string;
    children: React.ReactNode;
};

function ActionTooltip({align, side, label, children}: ActionTooltipProps) {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent side={side} align={align}>
                    <p className="font-semibold text-sm capitalize">{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default ActionTooltip;