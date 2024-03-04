import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import puppeteer from 'puppeteer';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) { }


  async fetchData(url: string): Promise<any> {
    console.log('url:', url);

    const browser = await puppeteer.connect({
      browserWSEndpoint: this.configService.getOrThrow('SBR_WS_ENDPOINT'),
    });
    try {
      console.log('browser:', browser);

      const page = await browser.newPage();
      page.setDefaultNavigationTimeout(2 * 60 * 1000);
      await Promise.all([
        page.waitForNavigation(),
        page.goto(url),
      ]);


      await Promise.all([
        page.waitForNavigation(),
        page.click('#searchResultSol_notice_43052864509'),
      ]);

      return await page.$$eval(
        '.simpleSolResultsItemInfo',
        (resultItems) => {
          return resultItems.map((resultItem) => {

            const title = resultItem.querySelector(
              '.twoColFields .mets-field-view span',
            )?.textContent;



            return {

              title,
            };
          });
        },
      );
    } catch (error) {
      throw new Error(`Error fetching data from`);
    }
  }

}
