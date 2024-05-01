import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  // @Get('fetch-data')
  // async fetchData(): Promise<any> {
  //   const url = `https://www.merx.com/public/solicitations/professional-administrative-and-management-support-services-10040`;
  //   return this.appService.fetchData(url);
  // }


 
}
