import { Test, TestingModule } from '@nestjs/testing';
import { WebScrapController } from './web_scrap.controller';

describe('WebScrapController', () => {
  let controller: WebScrapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebScrapController],
    }).compile();

    controller = module.get<WebScrapController>(WebScrapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
