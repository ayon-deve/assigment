import { Module } from '@nestjs/common';
import { WebScrapService } from './web_scrap.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { LeadsSchema } from 'src/models/item.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: 'leads', schema: LeadsSchema },
    ])],
  providers: [WebScrapService]
})
export class WebScrapModule {}



