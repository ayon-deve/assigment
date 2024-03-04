import { Controller, Get, Param } from '@nestjs/common';
import { WebScrapService } from './web_scrap.service';

@Controller('web-scrap')
export class WebScrapController {

    constructor(public webScrapService: WebScrapService) { }

    @Get('/fetch/:solicitationId')
    async fetchData(@Param('solicitationId') solicitationId: string): Promise<any> {
        const url = `https://www.merx.com/mbgov/solicitations/open-bids/${solicitationId}?origin=0`;
        return this.webScrapService.fetchData(url);
    }
}
