"use client";

import {GuildContext, UserContext} from "@/lib/context";
import React, {useContext} from 'react';
import {Separator} from "@/components/ui/separator";
import {Headphones, Mic, Settings} from "lucide-react";
import RoomItem from "@/components/navigation/room-item";
import RoomsCategory from "@/components/navigation/rooms-category";
import {ScrollArea} from "@/components/ui/scroll-area"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {displayNameToAvatar} from "@/lib/utils";
import useGuildChannels from "@/lib/hooks/guild/useGuildChannels";
import {useRouter} from "next/navigation";

interface RoomsNavbarProps {

};

function RoomsNavbar({}: RoomsNavbarProps) {
    const {user} = useContext(UserContext);
    const {guildId, roomId} = useContext(GuildContext);
    const router = useRouter();

    const { queries: { findGuildChannels: {data, isLoading} } } = useGuildChannels(guildId);

    return (
        <nav className="w-[240px] bg-[#2A2D31] fixed inset-y-0 flex flex-col">
            <div className="w-full h-[48px] shadow-lg border-b border-b-black/20">
                <div className="w-full h-full flex items-center justify-center">
                    <h1 className="text-white font-bold text-sm">Les Manchots Aveugles</h1>
                </div>
            </div>

            <ScrollArea className="w-full h-full mb-[53px]">
                {isLoading && (
                    <p>LOADING</p>
                )}

                {data?.map((channelGroup) => (
                    <RoomsCategory
                        key={channelGroup.id}
                        label={channelGroup.displayName}
                        guildId={guildId!}
                        channelGroupId={channelGroup.id}
                    >
                        {channelGroup.channels.map((channel) => (
                            <RoomItem
                                key={channel.id}
                                roomType={channel.type}
                                label={channel.displayName}
                                guildId={guildId!}
                                roomId={channel.id}
                                active={roomId === channel.id}
                            />
                        ))}
                    </RoomsCategory>
                ))}
            </ScrollArea>

            <div className="w-[90%] mx-auto">
                <Separator className="bg-[#36383D]"/>
            </div>

            <div className="absolute bottom-0 h-[53px] bg-[#232329] w-full text-gray-400">
                <div className="w-full h-full px-2 flex items-center justify-between">
                    <div className="min-w-[120px] flex flex-row items-center justify-start gap-2">
                        <Avatar className="w-[32px] h-[32px]">
                            <AvatarImage src={user?.photoURL ?? undefined}/>
                            <AvatarFallback>{displayNameToAvatar(user?.displayName)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-start justify-between">
                            <h3 className="text-sm text-white">{user?.displayName}</h3>
                            <span className="text-xs">online</span>
                        </div>
                    </div>

                    <div className="flex flex-row items-center justify-end gap-2">
                        <button className="hover:text-white transition-all">
                            <Mic size={20}/>
                        </button>
                        <button className="hover:text-white transition-all">
                            <Headphones size={20}/>
                        </button>
                        <button className="hover:text-white transition-all">
                            <Settings size={20}/>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default RoomsNavbar;