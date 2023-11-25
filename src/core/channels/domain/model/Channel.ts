
export interface IChannel {
    readonly id: string;
    readonly displayName: string;
    readonly type: "text" | "voice";
}