import React from 'react';
import {Hash, Volume2} from "lucide-react";
import {cn} from "@/lib/utils";
import Link from "next/link";

interface RoomItemProps {
    roomType: "text" | "voice";
    guildId: string;
    roomId: string;
    label: string;
    active?: boolean;
};

function RoomItem({roomType, label, active, guildId, roomId}: RoomItemProps) {
    return (
        <Link
            href={`/channels/${guildId}/${roomId}`}
            className={cn(
                "block w-full text-gray-400 px-2 py-4 rounded hover:bg-gray-100/5 hover:text-gray-300 transition-all h-[24px] flex items-center justify-between",
                active && '!bg-gray-100/10 !text-white'
            )}
        >
            <div className="flex flex-row items-center justify-center gap-2">
                { roomType === "text" && <Hash size={16} className="text-gray-400" /> }
                { roomType === "voice" && <Volume2 size={16} className="text-gray-400" /> }
                <span className="lowercase">{ label }</span>
            </div>
        </Link>
    );
};

export default RoomItem;