import {WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer} from '@nestjs/websockets';
import {Socket, Server} from 'socket.io';

@WebSocketGateway(8080,{
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        transports: ['websocket', 'polling'],
        credentials: true
    }
})

export class EventGateway{

    
    @WebSocketServer() 
    server: Server;

    @SubscribeMessage('chat')
    handleEvent(
        @MessageBody() data:string,
        @ConnectedSocket()  client:Socket
        ): string{
            this.server.emit('chat', data);
            console.log(data)
        return data;
    }


    @SubscribeMessage('joinChat')
    handleJoinChat(
        @MessageBody() data:string,
        @ConnectedSocket()  client:Socket
        ): string{
            console.log(data)
            this.server.emit('joinChat', data);
        return data;
    }

    @SubscribeMessage('typing')
    handleTyping(
        @MessageBody() data:string,
        @ConnectedSocket()  client:Socket
        ): string{
            console.log(data)
            this.server.emit('typing', data);
        return data;
    }

}

