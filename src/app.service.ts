import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as moment from 'moment';
import puppeteer from 'puppeteer';
import * as ExcelJS from 'exceljs';


@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) { }


  async fetchData(url: string): Promise<any> {
    console.log('url:', url);
    try {

      const browser = await puppeteer.launch();
      console.log('browser:', browser);

      const page = await browser.newPage();
      await page.goto(url)
      const table = await page.waitForSelector("#solicitationsList")
      console.log('table:', table);

      const anchorTagsLink = await table.evaluate(() => {
        const allAnchorTags = Array.from(document.querySelectorAll('tbody tr td a'))
        // let value = title[1].innerHTML.replaceAll("_____\t\t\t\"", "_").trim().toLowerCase()


        return allAnchorTags.map(tag => {
          const links = "https://www.merx.com" + tag.getAttribute('href')
          return { links, value: tag.querySelector(".rowTitle").textContent.replaceAll("_____\t\t\t\"", "_").trim().toLowerCase(), regional_district: tag.querySelector(".buyer-name").textContent.replaceAll("_____\t\t\t\"", "_").trim().toLowerCase(), country: tag.querySelector(".location").textContent.replaceAll("_____\t\t\t\"", "_").trim().toLowerCase(), }
        });
      });
      console.log('anchorTagsLink============>', anchorTagsLink)


      const workbook = new ExcelJS.Workbook();
      console.log('workbook:', workbook);
      const worksheet = workbook.addWorksheet('Links');
      console.log('worksheet:', worksheet);

      const headerRow = worksheet.addRow(['Links','Title','Regional District','Country']);
      headerRow.font = { bold: true };
      headerRow.alignment = { vertical: 'middle', horizontal: 'center' };

      anchorTagsLink.forEach(link => {
        const row = worksheet.addRow([link.links, link.value,link.regional_district,link.country ]);
    
        row.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: (worksheet.rowCount % 2 === 0) ? 'FFEAEAEA' : 'FFFFFFFF' },
        };
 
        worksheet.getColumn(1).width = 120;  
        worksheet.getColumn(2).width = 70; 
        worksheet.getColumn(3).width = 50;  
        worksheet.getColumn(3).width = 50;  

      });

      await workbook.xlsx.writeFile('input.xlsx');
      // await browser.close();

      // const dataSet = []

      // for (let i in anchorTagsLink) {
      //   const anchorTagLink = anchorTagsLink[i];
      //   console.log('anchorTagLink=============>', anchorTagLink)
      //   const data = {
      //     link: anchorTagLink,
      //     info: {}
      //   }
      //   await page.goto(anchorTagLink)
      //   // await page.waitForNavigation()
      //   const contentBlock = await page.waitForSelector('.content-block')
      //   // const allChilds = await page.evaluateHandle(e => e.children, contentBlock);
      //   console.log("contentBlock============", contentBlock)

      //   data.info = await contentBlock.evaluate(() => {
      //     const allH3Childs = Array.from(document.querySelectorAll(".content-block h3"));
      //     const allDivChilds = Array.from(document.querySelectorAll(".content-block div.twoColFields"));
      //     const infoData = {}
      //     let currentActiveInfoHeader = null
      //     for (let j in allH3Childs) {
      //       const h3Child = allH3Childs[j]
      //       currentActiveInfoHeader = h3Child.textContent ? h3Child.textContent.replaceAll(" ", "_").trim().toLowerCase() : `${moment().valueOf()}`
      //       if (!infoData[currentActiveInfoHeader]) infoData[currentActiveInfoHeader] = {}

      //       // const infoChilds = allDivChilds[j].querySelectorAll(".mets-field")
      //       // for (let k in infoChilds) {
      //       //   const infoChild = infoChilds[k];
      //       //   const infoKey = infoChild.querySelectorAll('span')[0].textContent.replaceAll(" ", "_").trim().toLowerCase()
      //       //   const infoValue = infoChild.querySelector('div p').textContent
      //       //   infoData[currentActiveInfoHeader][infoKey] = infoValue
      //       // }

      //     }

      //     return currentActiveInfoHeader
      //   })
      //   console.log("data", data)
      //   dataSet.push(data)
      // }



      // const allAnchorTags = await table.$$("tbody tr td a")
      // console.log('allAnchorTags========>', allAnchorTags.length)
      // allAnchorTags.forEach(tag => {
      //   console.log('tag:', tag.innerHTML)
      // })

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
      console.log('error============>', error)
      throw new Error(`Error fetching data from`);
    }
  }



}
