---
title: About
---

### About this application
This web app provides a way to run a **Kevoree** JavaScript node directly in your **browser**.  
It acts pretty much as the other Kevoree runtimes but considering that you are in a browser environment you will face some *limitations*, but your Kevoree components will also be able to *display* themselves in a nice and shiny dashboard UI!

### Browser limitations

You **cannot run any server** in a browser. This means that you will not be able to use Kevoree components, groups, channels or nodes that start servers.  
But you can find some **TypeDefinitions** in the Kevoree standard library that are based on a **centralized architecture**. Which means that you will be able to use any component that just start for instance a WebSocket client.  

 - Real-time communications in a browser can be made with WebSockets  
 - We provide one public "broadcast" WebSocket server at [ws://ws.kevoree.org](http://ws.kevoree.org)
