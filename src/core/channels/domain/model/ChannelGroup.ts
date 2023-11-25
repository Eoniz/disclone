import {IChannel} from "@/core/channels/domain/model/Channel";

export interface IChannelGroup {
    readonly id: string;
    readonly displayName: string;
    readonly channels: Array<IChannel>;
}
