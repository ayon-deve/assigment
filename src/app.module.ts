import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebScrapController } from './web_scrap/web_scrap.controller';
import { WebScrapModule } from './web_scrap/web_scrap.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { configuration } from 'config/configuration';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_STR'),
        dbName: configService.get<string>('MONGO_DB_NAME'),
      }),
    }),
    ScheduleModule.forRoot(),
    WebScrapModule,
    UsersModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}



