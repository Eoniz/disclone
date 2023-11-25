"use client";

import React, {useContext} from 'react';
import DiscordSakuraLogo from "@/components/logo/discord-sakura-logo";
import {Separator} from "@/components/ui/separator";
import {Plus} from "lucide-react";
import ActionTooltip from "@/components/tooltip/action-tooltip";
import useUserGuilds from "@/lib/hooks/user/useUserGuilds";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {displayNameToAvatar} from "@/lib/utils";
import CreateGuildDialog from "@/components/dialog/guild/create-guild-dialog";
import {ScrollArea} from "@/components/ui/scroll-area";
import {GuildContext} from "@/lib/context";
import Link from "next/link";

interface ChannelsNavbarProps {
};

function ChannelsNavbar({}: ChannelsNavbarProps) {
    const {queries: {guilds: {data}}} = useUserGuilds();
    const {guildId} = useContext(GuildContext);

    return (

        <nav className="z-20 bg-[#1E1E22] hidden md:block fixed w-[72px] left-0 inset-y-0">
            <ScrollArea className="w-full h-full">
                <ul role="tree" tabIndex={0} className="w-full h-full flex flex-col space-y-4 items-center py-3">
                    <div className="w-[48px] h-[48px]">
                        <ActionTooltip align={"center"} side={"right"} label={"Direct messages"}>
                            <button className="group">
                                <div
                                    className="w-[48px] h-[48px] bg-[#2C2E31] rounded-[24px] group-hover:rounded-[16px] overflow-hidden group-hover:bg-emerald-500 transition-all flex items-center justify-center">
                                    <DiscordSakuraLogo/>
                                </div>
                            </button>
                        </ActionTooltip>
                    </div>

                    <div className="w-[32px] mx-auto">
                        <Separator className="bg-[#36383D]"/>
                    </div>

                    {data?.map((guild) => (
                        <div key={guild.id} className="w-full h-fit relative">
                            <Link
                                key={guild.id}
                                className="block w-[48px] h-[48px] mx-auto"
                                href={`/channels/${guild.id}`}
                            >
                                <ActionTooltip align={"center"} side={"right"} label={guild.displayName}>
                                    <button className="group">
                                        <div
                                            className="w-[48px] h-[48px] rounded-[24px] group-hover:rounded-[16px] overflow-hidden transition-all flex items-center justify-center"
                                        >
                                            <Avatar
                                                className="w-[48px] h-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all"
                                            >
                                                <AvatarImage src={guild.imageUrl ?? undefined}/>
                                                <AvatarFallback>{displayNameToAvatar(guild.displayName)}</AvatarFallback>
                                            </Avatar>
                                        </div>
                                    </button>
                                </ActionTooltip>
                            </Link>
                            {guild.id === guildId && (
                                <div
                                    className="absolute left-0 w-[5px] bg-[#D5D5D7] inset-y-1 rounded-tr-2xl rounded-br-2xl"
                                />
                            )}
                        </div>
                    ))}

                    <CreateGuildDialog>
                        <div className="w-[48px] h-[48px]">
                            <ActionTooltip align={"center"} side={"right"} label={"Create a server"}>
                                <button className="group">
                                    <div
                                        className="w-[48px] h-[48px] bg-[#2C2E31] rounded-[24px] group-hover:rounded-[16px] group-hover:bg-emerald-500 transition-all flex items-center justify-center">
                                        <Plus className="text-emerald-500 group-hover:text-white"/>
                                    </div>
                                </button>
                            </ActionTooltip>
                        </div>
                    </CreateGuildDialog>
                </ul>
            </ScrollArea>
        </nav>
    );
};

export default ChannelsNavbar;