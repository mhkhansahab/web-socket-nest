import {WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket} from '@nestjs/websockets';
import {Socket} from 'socket.io';

@WebSocketGateway(8080,{
    cors: {
        origin: '*'
    }
})

export class EventGateway{

    @SubscribeMessage('testing')
    handleEvent(
        @MessageBody() data:string,
        @ConnectedSocket()  socket:Socket
        ): string{
            socket.emit('testing2', data)
            console.log(data)
        return data;
    }


}

