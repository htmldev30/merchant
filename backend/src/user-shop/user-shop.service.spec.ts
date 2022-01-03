import { Test, TestingModule } from '@nestjs/testing';
import { UserShopService } from './user-shop.service';

describe('UserShopService', () => {
  let service: UserShopService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserShopService],
    }).compile();

    service = module.get<UserShopService>(UserShopService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
