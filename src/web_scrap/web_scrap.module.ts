import { Module } from '@nestjs/common';
import { WebScrapService } from './web_scrap.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersSchema } from 'src/models/item.schema';

@Module({
  imports: [
    ConfigModule,
    // MongooseModule.forFeature([
    //   { name: 'users', schema: UsersSchema },
    // ])]
  ],
  providers: [WebScrapService]
})
export class WebScrapModule {}



