# WS-Server

Quick WebSockets server for handling plaintext chat simulation.

Use a client with plaintext input and output to connect to the server at `ws://localhost:8999` after setup

You could try [Smart WebSocket Client](https://chrome.google.com/webstore/detail/smart-websocket-client/omalebghpgejjiaoknljcfmglgbpocdp)

### Requirements

You need to have TypeScript installed

### Setup

```shell
npm i
npm run build
npm start
```

### Send Message

You will need to use the correct formatting to receive the correct feedback:
```
{{YourUsername}}The message can start right up against it if you want.
and can stretch over multiple lines.
```

The username must be surrounded by two curly braces: `{{SuperGal}}`

The rest of the message will be treated as plaintext only.

**Warning** Don't use this in a production setting as nothing is sanitized.

### Output

I recommend a client with a plaintext (TextArea) output of some kind.

I'd also recommend [Ace Editor](https://ace.c9.io/) to give you a better view of the output object.
