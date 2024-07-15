# WebSocket Live Scoreboarding

The WebSocket Live Scoreboarding is a real-time score tracking system that utilizes WebSocket technology to provide live updates of scores for various sports or events. This system allows users to connect to the server using WebSocket connections and receive real-time score updates as they happen.

## Features

- Real-time score updates: Get live score updates as they happen.
- User can do an action to increase the score
- Have anti-cheating mechanism

## Prerequisites

1. Node.js & Express.js
2. Socket.IO
3. A good browser

### **WebSockets: The Magic Behind Real-Time**

Now that we understand the importance of real-time chat, it's time to uncover the magic that makes it all possible - WebSockets. WebSockets are the secret ingredient behind instantaneous, bidirectional communication in web applications.

**The Basics of WebSockets**

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1694974006030/dfc60083-2e96-4343-9302-6ebf93eb3128.png)

At its core, a WebSocket is a communication protocol that enables real-time, full-duplex communication between a client (usually a web browser) and a server. Let's break down how it works:

1. **Initialization:** A WebSocket connection begins with an initial handshake, much like when your web browser connects to a web server. This handshake is done using the HTTP protocol.
2. **Upgrade to WebSocket:** After the initial handshake, if both the client and server support WebSockets, the connection is upgraded to a WebSocket connection. This upgrade is crucial because it allows the connection to stay open, enabling continuous, bidirectional communication.
3. **Full-Duplex Communication:** Once upgraded, WebSockets facilitate full-duplex communication. In simpler terms, it means both the client and server can send messages to each other simultaneously, without the need for separate requests and responses.

### **Building the Real-Time Live Score with Websocket and Node.js**

Here is overall flow for this app

![](https://tscout.s3.ap-southeast-1.amazonaws.com/thanh/Overall+flow.png)

1. Sign up flow
   Server allow user register by email and then validate account by OTP

   ![](https://tscout.s3.ap-southeast-1.amazonaws.com/thanh/signup-validate.png)

2. Update Score
   Increase the user’s score when user complete an action
   Each user can login to the app with only 1 device

   We have a score check team to make sure that no cheating in updating score

   ![](https://tscout.s3.ap-southeast-1.amazonaws.com/thanh/update-score.png)

3. View Top 10 highest score

   ![](https://tscout.s3.ap-southeast-1.amazonaws.com/thanh/view-score.png)
