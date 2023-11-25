import {IGuild} from "@/core/guilds/domain/model/Guild";
import {IChannelGroup} from "@/core/channels/domain/model/ChannelGroup";
import {ICreateChannelCommand} from "@/core/channels/domain/model/commands/CreateChannelCommand";
import {IChannel} from "@/core/channels/domain/model/Channel";

export interface IChannelRepository {
    findAllChannelsFromGuildId(guildId: IGuild['id']): Promise<Array<IChannelGroup>>;
    createChannel(createChannelCommand: ICreateChannelCommand): Promise<IChannel>;
}