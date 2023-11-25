import {IGuild} from "@/core/guilds/domain/model/Guild";
import {IChannelGroup} from "@/core/channels/domain/model/ChannelGroup";

export interface ICreateChannelCommand {
    readonly guildId: IGuild['id'];
    readonly channelGroupId: IChannelGroup['id'];
    readonly type: "voice" | "text";
    readonly displayName: string;
}