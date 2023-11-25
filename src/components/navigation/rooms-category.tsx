"use client";

import React, {MouseEvent, MouseEventHandler, useState} from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {Plus} from "lucide-react";
import ActionTooltip from "@/components/tooltip/action-tooltip";
import CreateGuildDialog from "@/components/dialog/guild/create-guild-dialog";
import CreateChannelDialog from "@/components/dialog/channel/create-channel-dialog";

interface RoomsCategoryProps {
    label: string;
    children: React.ReactNode;
    guildId: string;
    channelGroupId: string;
};

function RoomsCategory({label, children, guildId, channelGroupId}: RoomsCategoryProps) {
    const [open, setOpen] = useState(false);

    const handleOpenCreateChannelModal = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        setOpen(true);
    }

    return (
        <>
            <Accordion type="single" dir={"rtl"} collapsible defaultValue={label} className="flex text-gray-400 flex-col space-y-2 px-2 !border-0 !pb-0">
                <AccordionItem value={label} className="border-b-0 p-0">
                    <AccordionTrigger className="group pb-2 flex flex-row items-center justify-between gap-2">
                        <button
                            className="flex flex-row gap-1 items-center justify-start z-0 hover:text-white"
                            onClick={handleOpenCreateChannelModal}
                        >
                            <Plus size={16} />
                        </button>
                        <h3 className="text-gray-400 uppercase group-hover:text-white text-xs font-bold w-full text-start">{label}</h3>
                    </AccordionTrigger>
                    <AccordionContent className="border-b-0 !pb-0">
                        {children}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <CreateChannelDialog
                open={open}
                onOpenChange={setOpen}
                guildId={guildId}
                channelGroupId={channelGroupId}
            />
        </>
    );
};

export default RoomsCategory;