import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import { LoginModule } from './Login/login.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://ng-customizable-chat:CustomChatng1@tfg.4hfnj.mongodb.net/TFG?retryWrites=true&w=majority', { useFindAndModify: false }), LoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
