import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LevelService } from './level.service';
import { LevelEntity } from './entities/level.entity';

describe('Tests LevelService', () => {
  let service: LevelService;
  const levelRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LevelService,
        {
          provide: getRepositoryToken(LevelEntity),
          useValue: levelRepository,
        },
      ],
    }).compile();

    service = module.get(LevelService);
  });

  describe('findAll', () => {
    it('Should return all levels', async () => {
      const spyRepository = jest
        .spyOn(levelRepository, 'find')
        .mockResolvedValue([
          { id: 1, name: 'beginner' },
          { id: 2, name: 'advanced' },
        ]);

      const result = await service.findAll();

      expect(spyRepository).toHaveBeenCalledTimes(1);
      expect(result).toStrictEqual([
        { id: 1, name: 'beginner' },
        { id: 2, name: 'advanced' },
      ]);
    });
  });

  describe('findOneByName', () => {
    it('Should return a level from a name', async () => {
      const spyRepository = jest
        .spyOn(levelRepository, 'findOneBy')
        .mockResolvedValue({ id: 1, name: 'beginner' });

      const result = await service.findOneByName('beginner');

      expect(spyRepository).toHaveBeenCalledTimes(1);
      expect(spyRepository).toHaveBeenCalledWith({ name: 'beginner' });
      expect(result).toStrictEqual({ id: 1, name: 'beginner' });
    });

    it('Should throw Error not found when name does not exist', async () => {
      jest.spyOn(levelRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.findOneByName('missing')).rejects.toThrow(
        'Level missing not found',
      );
    });
  });

  describe('findOneById', () => {
    it('Should return a level from an Id', async () => {
      const spyRepository = jest
        .spyOn(levelRepository, 'findOneBy')
        .mockResolvedValue({ id: 1, name: 'beginner' });

      const result = await service.findOneById(1);

      expect(spyRepository).toHaveBeenCalledTimes(1);
      expect(spyRepository).toHaveBeenCalledWith({ id: 1 });
      expect(result).toStrictEqual({ id: 1, name: 'beginner' });
    });

    it('Should throw Error not found when id does not exist', async () => {
      jest.spyOn(levelRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.findOneById(1)).rejects.toThrow(
        'Level with id 1 not found',
      );
    });
  });

  describe('createNewLevel', () => {
    it('Should create a new level', async () => {
      const spyRepository = jest
        .spyOn(levelRepository, 'save')
        .mockResolvedValue({ id: 1, name: 'beginner' });

      const result = await service.createNewLevel({ name: 'beginner' });

      expect(spyRepository).toHaveBeenCalledTimes(1);
      expect(spyRepository).toHaveBeenCalledWith({ name: 'beginner' });
      expect(result).toStrictEqual({ id: 1, name: 'beginner' });
    });
  });
});
