import { I, T } from './interfaces';

export function botMessage(args: I.BotMessage) : T.BotMessage
{
    let formattedMessage: I.UserMessage = {
        name:    nameField(args.bot),
        date:    new Date(),
        message: args.message,
    };

    return JSON.stringify(formattedMessage);
}

export function nameField(_name: T.UserName | T.Bot) : T.NameField
{
    //return `<strong class="nameField">${_name}:</strong>`;

    return `[[[ ${_name} ]]]`;
}

export function parseMessage(_message: string) : I.ParsedMessage
{
    const nameRegex = /^{{.*?}}/;
    
    let user:    string;
    let message: string;

    user = (_message.match(nameRegex) ? _message.match(nameRegex)[0] : 'Anonymous');
    user = user.replace(/{{/, '').replace(/}}/, '');
    message = _message.replace(nameRegex, '');

    return {
        user,
        message,
    };
}

export function userMessage(_messageObject: I.ParsedMessage) : T.UserMessage
{
    let formattedMessage: I.UserMessage = {
        name:    nameField(_messageObject.user),
        date:    new Date(),
        message: _messageObject.message,
    };

    return JSON.stringify(formattedMessage);
}
