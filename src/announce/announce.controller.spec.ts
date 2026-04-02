import { Test, TestingModule } from '@nestjs/testing';
import { AnnounceController } from './announce.controller';
import { AnnounceService } from './announce.service';

describe('Tests AnnounceController', () => {
  let controller: AnnounceController;
  const service = {
    searchAnnounce: jest.fn(),
    createAnnounce: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnnounceController],
      providers: [AnnounceService],
    })
      .overrideProvider(AnnounceService)
      .useValue(service)
      .compile();

    controller = module.get<AnnounceController>(AnnounceController);
  });

  it('Should search an announce', async () => {
    const spyAnnounceService = jest
      .spyOn(service, 'searchAnnounce')
      .mockResolvedValue({
        id: 1,
        price: 100,
        level: { id: 1, name: 'beginner' },
        subject: { id: 1, name: 'maths' },
      });

    const result = await controller.searchAnnounce({
      levelName: 'beginner',
      subjectName: 'maths',
    });

    expect(spyAnnounceService).toHaveBeenCalledTimes(1);
    expect(spyAnnounceService).toHaveBeenCalledWith({
      levelName: 'beginner',
      subjectName: 'maths',
    });
    expect(result).toStrictEqual({
      id: 1,
      price: 100,
      level: { id: 1, name: 'beginner' },
      subject: { id: 1, name: 'maths' },
    });
  });

  it('Should create an announce', async () => {
    const spyAnnounceService = jest
      .spyOn(service, 'createAnnounce')
      .mockResolvedValue({
        id: 1,
        price: 100,
        level: { id: 1, name: 'beginner' },
        subject: { id: 1, name: 'maths' },
      });

    const result = await controller.createAnnounce({
      price: 100,
      level: { name: 'beginner' },
      subject: { name: 'maths' },
    });

    expect(spyAnnounceService).toHaveBeenCalledTimes(1);
    expect(spyAnnounceService).toHaveBeenCalledWith({
      price: 100,
      level: { name: 'beginner' },
      subject: { name: 'maths' },
    });
    expect(result).toStrictEqual({
      id: 1,
      price: 100,
      level: { id: 1, name: 'beginner' },
      subject: { id: 1, name: 'maths' },
    });
  });
});
