"use client";

import {useContext} from "react";
import {GuildContext} from "@/lib/context";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {ChannelRepositoryImpl} from "@/core/channels/application/ChannelRepositoryImpl";
import {ICreateChannelCommand} from "@/core/channels/domain/model/commands/CreateChannelCommand";

export default function useGuildChannels(guildId?: string | null) {
    const queryClient = useQueryClient();

    const findGuildChannelsQuery = useQuery(
        [`query/guild/findGuildChannelsQuery`, guildId],
        async () => {
            if (!guildId) {
                return [];
            }

            try {
                return ChannelRepositoryImpl.findAllChannelsFromGuildId(guildId)
            } catch (e) {
                console.error(e);
                return [];
            }
        },
        {
            refetchOnWindowFocus: false,
            cacheTime: 5000,
        }
    );

    const createChannelMutation = useMutation(
        `/mutation/guild/createChannel`,
        async (command: ICreateChannelCommand) => {
            if (!guildId) {
                return;
            }

            try {
                return await ChannelRepositoryImpl.createChannel(command)
            } catch (e) {
                console.error(e);
                throw e;
            }
        },
        {
            onSuccess: async () => {
                return await queryClient.invalidateQueries([`query/guild/findGuildChannelsQuery`, guildId]);
            }
        }
    )

    return {
        queries: {
            findGuildChannels: findGuildChannelsQuery,
        },
        mutations: {
            createChannel: createChannelMutation,
        }
    };
}