import { Test, TestingModule } from '@nestjs/testing';
import { WebScrapService } from './web_scrap.service';

describe('WebScrapService', () => {
  let service: WebScrapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebScrapService],
    }).compile();

    service = module.get<WebScrapService>(WebScrapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
