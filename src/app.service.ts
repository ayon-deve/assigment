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

      const browser = await puppeteer.launch({ headless: false });
      console.log('browser:', browser);

      const page = await browser.newPage();
      await page.goto(url)
      const table = await page.waitForSelector("#solicitationsList")
      console.log('table:', table);

      const anchorTagsLink = await table.evaluate(() => {
        const allAnchorTags = Array.from(document.querySelectorAll('tbody tr td a'))


        return allAnchorTags.map(tag => {
          const links = "https://www.merx.com" + tag.getAttribute('href')
          return {
            links, value: tag.querySelector(".rowTitle").textContent.replaceAll("_____\t\t\t\"", "_").trim().toLowerCase(), regional_district: tag.querySelector(".buyer-name").textContent.replaceAll("_____\t\t\t\"", "_").trim().toLowerCase(), country: tag.querySelector(".location").textContent.replaceAll("_____\t\t\t\"", "_").trim().toLowerCase(),
            published_time: tag.querySelector(".publicationDate .dateValue").textContent.replaceAll("_____\t\t\t\"", "_"),
            closing_time: tag.querySelector(".closingDate .dateValue").textContent.replaceAll("_____\t\t\t\"", "_")
          }
        });
      });
      console.log('anchorTagsLink============>', anchorTagsLink)


      const workbook = new ExcelJS.Workbook();
      console.log('workbook:', workbook);
      const worksheet = workbook.addWorksheet('Links');
      console.log('worksheet:', worksheet);

      const headerRow = worksheet.addRow(['Links', 'Title', 'Regional District', 'Country', 'Published Date', 'Closing Date']);
      headerRow.font = { bold: true };
      headerRow.alignment = { vertical: 'middle', horizontal: 'center' };

      anchorTagsLink.forEach(link => {
        const row = worksheet.addRow([link.links, link.value, link.regional_district, link.country, link.published_time, link.closing_time]);

        row.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: (worksheet.rowCount % 2 === 0) ? 'FFEAEAEA' : 'FFFFFFFF' },
        };

        worksheet.getColumn(1).width = 120;
        worksheet.getColumn(2).width = 70;
        worksheet.getColumn(3).width = 70;
        worksheet.getColumn(4).width = 60;
        worksheet.getColumn(5).width = 40;
        worksheet.getColumn(6).width = 40;

      });

      await workbook.xlsx.writeFile('input.xlsx');

      const dataSet = []
      let anchorTagLink

      for (let i in anchorTagsLink) {
        try {
          anchorTagLink = anchorTagsLink[i].links;
          console.log('anchorTagLink=============>', anchorTagLink)
          await page.goto(anchorTagLink)
          // await page.waitForNavigation()
          // try {
          //   const loginCloseButton = await page.waitForSelector(".ui-button .ui-icon-closethick", { timeout: 1000 })
          //   loginCloseButton.click();
          // } catch (e) {
          //   console.log('loginCloseButto error', e)
          // }

          const contentBlock = await page.waitForSelector('#content .solWrapper div form .content-block', { timeout: 10000 })
          console.log("contentBlock===========>", contentBlock)


          const infoDataSet = await contentBlock.evaluate(() => {
            // const allH3Childs = Array.from(document.querySelectorAll(".content-block .content-block-title"));


            const allH3Childs = Array.from(document.querySelectorAll(".content-block div.twoColFields div.mets-field-view"));
            const allDivChilds = Array.from(document.querySelectorAll(".content-block div.twoColFields .mets-field-label p"));
            const infos = {}
            allH3Childs.forEach(element => {
              const span = element.querySelector("span")
              const p = element.querySelector("div p")
              const field = span.innerHTML.replaceAll("_", "").replaceAll(`\t`, '').replaceAll(' ', '_').trim().toLowerCase()
              const value = p.textContent.replaceAll("_", "").replaceAll(`\t`, '').trim().replaceAll('\n', ', ')
              infos[field ? field : "contact_info"] = value
            });


            return infos

          })
          console.log("infoDataSet------------>", infoDataSet)
          dataSet.push({
            link: anchorTagLink,
            info: infoDataSet
          })

          const workbook = new ExcelJS.Workbook();
          const worksheet = workbook.addWorksheet('Solicitations');

          // Define the headers for the Excel file
          const headers = [
            'Link',
            'Reference Number',
            'Issuing Organization',
            'Solicitation Type',
            'Solicitation Number',
            'Title',
            'Source Id',
            'Location',
            'Delivery Point',
            'Purchase Type',
            'Publication',
            'Bid Intent',
            'Bid Intent Deadline',
            'Question Acceptance Deadline',
            'Questions Submitted Online',
            'Closing Date',
            'Contact Info',
            'Bid Submission Type'
            // Add more headers as needed
          ];

          // Add headers to the worksheet
          const headerRow = worksheet.addRow(headers);
          headerRow.eachCell(cell => {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FF0000FF' }, // Blue fill color
            };
            cell.font = {
              color: { argb: 'FFFFFFFF' }, // White font color
              bold: true,
            };
          });

          // Add data to the worksheet
          dataSet.forEach(item => {
            const rowData = [
              item.link,
              item.info.reference_number,
              item.info.issuing_organization,
              item.info.solicitation_type,
              item.info.solicitation_number,
              item.info.title,
              item.info.source_id,
              item.info.location_,
              item.info.delivery_point,
              item.info.purchase_type,
              item.info.publication,
              item.info.bid_intent,
              item.info.bid_intent_deadline,
              item.info.question_acceptance_deadline,
              item.info.questions_are_submitted_online,
              item.info.closing_date,
              item.info.contact_info,
              item.info.bid_submission_type,
            ];

            const row = worksheet.addRow(rowData);
            row.eachCell(cell => {
              cell.alignment = { vertical: 'middle', horizontal: 'left' };
              cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' },
              };
            });
            const columnWidths = [
              120, // Link
              70, // Reference Number
              70, // Issuing Organization
              70, // Solicitation Type
              70, // Solicitation Number
              70, // Title
              70, // Title
              70, // Title
              70, // Title
              70, // Title
              70, // Title
              70, // Title
              70, // Title
              70, // Title
              70, // Title
              70, // Title
              70, // Title
              70, // Title
              // Add more widths as needed
            ];

            worksheet.columns.forEach((column, index) => {
              column.width = columnWidths[index];
            });
          });

          // worksheet.columns.forEach(column => {
          //   column.width = column.header.length < 12 ? 12 : column.header.length;
          // });
          // Save the workbook to a file
          workbook.xlsx.writeFile('solicitations_formatted.xlsx')
            .then(() => {
              console.log('Excel file with proper formatting created successfully!');
            })
            .catch(error => {
              console.error('Error creating Excel file:', error);
            })
          // await browser.close();

        } catch (e) {
          // console.log("eeeeeeeeeeeeeeeeeeeeeeeee", e)
        }
      }
      console.log('dataSet------------>', JSON.stringify(dataSet));



      // const allAnchorTags = await table.$$("tbody tr td a")
      // console.log('allAnchorTags========>', allAnchorTags.length)
      // allAnchorTags.forEach(tag => {
      //   console.log('tag:', tag.innerHTML)
      // })

      // page.setDefaultNavigationTimeout(2 * 60 * 1000);
      // await Promise.all([
      //   page.waitForNavigation(),
      //   page.goto(url),
      // ]);


      // await Promise.all([
      //   page.waitForNavigation(),
      //   page.click('#searchResultSol_notice_43052864709'),
      // ]);

      // return await page.$$eval(
      //   '.simpleSolResultsItemInfo',
      //   (resultItems) => {
      //     return resultItems.map((resultItem) => {

      //       const title = resultItem.querySelector(
      //         '.twoColFields .mets-field-view span',
      //       )?.textContent;

      //       return {

      //         title,
      //       };
      //     });
      //   },
      // );
      // return 'Fetch Data Successful'
    } catch (error) {
      console.log('error============>', error)
      throw new Error(`Error fetching data from`);
    }
  }



}
