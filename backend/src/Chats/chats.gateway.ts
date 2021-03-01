import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import {HttpException, InternalServerErrorException, Logger, NotFoundException} from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import {UsersService} from "../Providers/users/users.service";
import {ChatsService} from "../Providers/chats/chats.service";
import {CreateMessageDto} from "../DTOs/create-message-dto";
import {MessagesService} from "../Providers/messages/messages.service";

@WebSocketGateway()
export class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(
      private readonly usersService: UsersService,
      private chatsService: ChatsService,
      private messagesService: MessagesService
  ) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.chatsService.socket = server;
  }

  handleDisconnect(client: Socket) {
    this.usersService.findOneBySocketIdAndEraseActivity(client.id);
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('saveSocket')
  socketSave(client: Socket, username: string): void {
    this.usersService.findOneBySocketIdAndAddActivity(client.id, username);
  }

  @SubscribeMessage('sendMessage')
  sendMessage(client:Socket, message: CreateMessageDto){
    try{
      this.messagesService.saveMessage(message);
    }catch (e : any){
      throw new InternalServerErrorException();
    }
  }



}
