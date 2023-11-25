"use client";

import React, {useContext, useEffect} from 'react';
import {useRouter} from "next/navigation";
import {GuildContext} from "@/lib/context";
import useGuildChannels from "@/lib/hooks/guild/useGuildChannels";

interface ChannelPageProps {
};

function ChannelPage({}: ChannelPageProps) {
    const router = useRouter();
    const {guildId, roomId} = useContext(GuildContext);
    const { queries: { findGuildChannels: { data, isLoading }} } = useGuildChannels(guildId);

    useEffect(() => {
        if (!data || !data.length) {
            return;
        }

        const channel = data
            .map((channelGroup) => channelGroup.channels)
            .flat()
            .find((channel) => channel.type === "text")

        if (!channel) {
            return;
        }

        router.push(`/channels/${guildId}/${channel.id}`);
    }, [data]);

    return (
        <>
            <h1>Hello World</h1>
        </>
    );
};

export default ChannelPage;