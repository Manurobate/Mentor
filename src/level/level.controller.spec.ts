import { LevelController } from './level.controller';
import { LevelService } from './level.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('Tests LevelController', () => {
  let controller: LevelController;
  const service = {
    findAll: jest.fn(),
    findOneById: jest.fn(),
    createNewLevel: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LevelController],
      providers: [LevelService],
    })
      .overrideProvider(LevelService)
      .useValue(service)
      .compile();

    controller = module.get<LevelController>(LevelController);
  });

  it('Should return all levels', async () => {
    const spyLevelService = jest.spyOn(service, 'findAll').mockResolvedValue([
      { id: 1, name: 'beginner' },
      { id: 2, name: 'advanced' },
    ]);

    const result = await controller.findAll();

    expect(spyLevelService).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual([
      { id: 1, name: 'beginner' },
      { id: 2, name: 'advanced' },
    ]);
  });

  it('Should return one level by id', async () => {
    const spyLevelService = jest
      .spyOn(service, 'findOneById')
      .mockResolvedValue({ id: 1, name: 'beginner' });

    const result = await controller.findOneById('1');

    expect(spyLevelService).toHaveBeenCalledTimes(1);
    expect(spyLevelService).toHaveBeenCalledWith(1);
    expect(result).toStrictEqual({ id: 1, name: 'beginner' });
  });

  it('Should create a new level', async () => {
    const spyLevelService = jest
      .spyOn(service, 'createNewLevel')
      .mockResolvedValue({
        id: 1,
        name: 'test-level',
      });

    const result = await controller.addLevel({
      name: 'test-level',
    });

    expect(spyLevelService).toHaveBeenCalledTimes(1);
    expect(spyLevelService).toHaveBeenCalledWith({ name: 'test-level' });
    expect(result).toStrictEqual({
      id: 1,
      name: 'test-level',
    });
  });
});
