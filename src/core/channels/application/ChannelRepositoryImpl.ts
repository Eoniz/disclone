import {IChannelRepository} from "@/core/channels/application/ChannelRepository";
import {IGuild} from "@/core/guilds/domain/model/Guild";
import {IChannelGroup} from "@/core/channels/domain/model/ChannelGroup";
import {collection, doc, getDocs, setDoc} from "@firebase/firestore";
import {firestore} from "@/lib/firebase";
import {IChannel} from "@/core/channels/domain/model/Channel";
import {ICreateChannelCommand} from "@/core/channels/domain/model/commands/CreateChannelCommand";
import {channel} from "diagnostics_channel";
import channelsNavbar from "@/components/navigation/channels-navbar";

export const ChannelRepositoryImpl: IChannelRepository = {
    async createChannel(command: ICreateChannelCommand): Promise<IChannel> {
        const channelsGroupCollection = collection(
            firestore,
            "guilds", command.guildId, "channels-group", command.channelGroupId, "channels"
        );

        const channelRef = doc(channelsGroupCollection);

        await setDoc(channelRef, {
            type: command.type,
            displayName: command.displayName,
        });

        return {
            type: command.type,
            displayName: command.displayName,
            id: channelRef.id,
        }
    },
    async findAllChannelsFromGuildId(guildId: IGuild["id"]): Promise<Array<IChannelGroup>> {
        console.log(guildId);
        const channelGroups: Array<IChannelGroup> = [];

        const channelsGroupCollection = collection(firestore, "guilds", guildId, "channels-group");
        const channelGroupResults = (await getDocs(channelsGroupCollection)).docs;

        await Promise.all(channelGroupResults.map(async (channelGroup) => {
            const channelGroupData = channelGroup.data();

            const channelsCollection = collection(channelsGroupCollection, channelGroup.id, "channels");
            const channelResults = (await getDocs(channelsCollection)).docs;

            const channels: Array<IChannel> = [];

            await Promise.all(channelResults.map((channel) => {
                const channelData = channel.data();
                channels.push({
                    id: channel.id,
                    displayName: channelData.displayName,
                    type: channelData.type,
                })
            }));

            channelGroups.push({
                id: channelGroup.id,
                displayName: channelGroupData.displayName,
                channels: channels.sort((a, b) => {
                    if (a.type === "text" && b.type === "voice") {
                        return -1;
                    }

                    if (a.type === "voice" && b.type === "text") {
                        return 1;
                    }

                    return a.displayName.localeCompare(b.displayName);
                })
            })
        }));

        return channelGroups.sort((a, b) => a.displayName.localeCompare(b.displayName));
    }
}
