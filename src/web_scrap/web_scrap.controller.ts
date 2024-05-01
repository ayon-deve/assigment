import { Controller, Get, Param } from '@nestjs/common';
import { WebScrapService } from './web_scrap.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Web scrap')
@Controller('web-scrap')
export class WebScrapController {

    constructor(public webScrapService: WebScrapService) { }

    @Get('/fetch/:solicitationId')
    async fetchData(): Promise<any> {
        const url = `https://www.merx.com/solicitations/open-bids/A-Security-Monitoring-Solution-Installation-Monitoring-and-Support/0000265652?origin=0`;
        return this.webScrapService.fetchData(url);
    }
}
