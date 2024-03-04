import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebScrapController } from './web_scrap/web_scrap.controller';
import { WebScrapModule } from './web_scrap/web_scrap.module';

@Module({
  imports: [WebScrapModule],
  controllers: [AppController, WebScrapController],
  providers: [AppService],
})
export class AppModule {}
