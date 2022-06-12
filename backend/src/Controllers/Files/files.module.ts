import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../Schemas/user.schema';
import { ChatSchema } from '../../Schemas/chat.schema';
import { MessageSchema } from '../../Schemas/message.schema';
import { ChatsService } from '../../Providers/chats/chats.service';
import { MessagesService } from '../../Providers/messages/messages.service';
import { UsersService } from '../../Providers/users/users.service';
import { FilesController } from './files.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Chat', schema: ChatSchema },
      { name: 'Message', schema: MessageSchema },
    ]),
  ],
  controllers: [FilesController],
  providers: [ChatsService, MessagesService, UsersService],
})
export class FilesModule {}
