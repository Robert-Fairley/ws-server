export namespace I
{
    export interface ParsedMessage
    {
        user:    string;
        message: string;
    }

    export interface BotMessage
    {
        bot:     T.Bot;
        message: string;
    }

    export interface UserMessage
    {
        name:    T.UserName,
        date:    T.MessageDate,
        message: T.Message
    }

}

export namespace T
{
    export type Bot         = string;
    export type BotMessage  = string;
    export type MessageDate = Date;
    export type Message     = string;
    export type NameField   = string;
    export type UserName    = string;
    export type UserMessage = string;
}
