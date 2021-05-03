import {
    ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect,
    OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer
} from '@nestjs/websockets';
import {InternalServerErrorException, Logger} from '@nestjs/common';
import {Socket, Server} from 'socket.io';
import {UsersService} from "../Providers/users/users.service";
import {ChatsService} from "../Providers/chats/chats.service";
import {MessagesService} from "../Providers/messages/messages.service";
import {CreateMessageDto} from "../DTOs/create-message-dto";


@WebSocketGateway({
    transports: ['websocket', 'polling'],
    cors: {
        origin: "http://localhost:4200/*"
    }
})
export class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    constructor(
        private usersService: UsersService,
        private chatsService: ChatsService,
        private messagesService: MessagesService
    ) {
    }

    @WebSocketServer() server;
    private logger: Logger = new Logger('ChatsGateway');

    afterInit(server) {
        this.chatsService.socket = server;
    }

    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
        this.usersService.findOneBySocketIdAndEraseActivity(client.id);
    }

    handleConnection(client) {
        this.logger.log(`Client connected: ${client.id}`);
    }

    @SubscribeMessage('saveSocket')
    socketSave(client: Socket, username: string): void {
        this.logger.log(`Im going to save the client's socket! ${client.id}, ${username}`);
        this.usersService.findOneBySocketIdAndAddActivity(client.id, username);
    }

    @SubscribeMessage('sendMessagePrivate')
    async sendMessagePrivate(client: Socket, message: CreateMessageDto) {
        try {
            this.logger.log('Send message to private chat participant');
            const messageSaved = await this.messagesService.saveMessage(message);
            const chat = await this.chatsService.findOneGroupById(message.chatId);
            var user;
            user = await this.usersService.findOneByUsername(chat.participants);
            if (user.active) {
                this.server.to(user.socketId).emit('messageSent', messageSaved);
            }
            user = await this.usersService.findOneByUsername(chat.name);
            if (user.active) {
                this.server.to(user.socketId).emit('messageSent', messageSaved);
            }
        } catch (e: any) {
            throw new InternalServerErrorException();
        }
    }

    @SubscribeMessage('sendMessageGroup')
    async sendMessageGroup(client: Socket, message: CreateMessageDto) {
        try {
            this.logger.log('Send message to the participants of a group');
            let messageSaved = await this.messagesService.saveMessage(message);
            let chat = await this.chatsService.findOneGroupById(message.chatId);
            for (let i = 0; i < chat.participants.length; i++) {
                const user = await this.usersService.findOneByUsername(chat.participants[i]);
                if (user.active == true) {
                    this.server.to(user.socketId).emit('messageSent', messageSaved);
                }
            }
        } catch (e: any) {
            throw new InternalServerErrorException();
        }
    }

    @SubscribeMessage('fileSentMessage')
    async sendFileReceived(client: Socket, data: any) {
        this.logger.log("Send message to participants that a new file is sent to the chat")
        const chat = await this.chatsService.findOneGroupById(data[2]);
        if (chat.isPrivate) {
            var user = await this.usersService.findOneByUsername(chat.participants);
            if (user.userName == data[0]) {
                user = await this.usersService.findOneByUsername(chat.name);
            }
            this.server.to(user.socketId).emit('fileReceived', data[1]);
        } else {
            for (let i = 0; i < chat.participants.length; i++) {
                const user = await this.usersService.findOneByUsername(chat.participants);
                if (data[0] != user.userName) this.server.to(user.socketId).emit('fileReceived', data[1])
            }
        }
    }

}
