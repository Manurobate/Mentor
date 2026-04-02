import { SubjectService } from './subject.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SubjectEntity } from './entities/subject.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('Tests SubjectService', () => {
  let service: SubjectService;
  const configService = {
    get: jest.fn(),
  };
  const cacheManager = {
    get: jest.fn(),
    set: jest.fn(),
  };

  const subjectRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubjectService,
        {
          provide: ConfigService,
          useValue: configService,
        },
        {
          provide: CACHE_MANAGER,
          useValue: cacheManager,
        },
        {
          provide: getRepositoryToken(SubjectEntity),
          useValue: subjectRepository,
        },
      ],
    }).compile();

    service = module.get(SubjectService);
  });

  describe('findAll', () => {
    it('Should return subjects from cache when available', async () => {
      const spyCacheGet = jest.spyOn(cacheManager, 'get').mockResolvedValue([
        { id: 1, name: 'maths' },
        { id: 2, name: 'physics' },
      ]);
      const spyRepository = jest.spyOn(subjectRepository, 'find');
      const spyCacheSet = jest.spyOn(cacheManager, 'set');

      const result = await service.findAll();

      expect(spyCacheGet).toHaveBeenCalledTimes(1);
      expect(spyCacheGet).toHaveBeenCalledWith('findAll');
      expect(spyRepository).not.toHaveBeenCalled();
      expect(spyCacheSet).not.toHaveBeenCalled();
      expect(result).toStrictEqual([
        { id: 1, name: 'maths' },
        { id: 2, name: 'physics' },
      ]);
    });

    it('Should return subjects from repository and cache them when cache is empty', async () => {
      const spyCacheGet = jest
        .spyOn(cacheManager, 'get')
        .mockResolvedValue(null);
      const spyRepository = jest
        .spyOn(subjectRepository, 'find')
        .mockResolvedValue([
          { id: 1, name: 'maths' },
          { id: 2, name: 'physics' },
        ]);
      const spyCacheSet = jest
        .spyOn(cacheManager, 'set')
        .mockResolvedValue(undefined);

      const result = await service.findAll();

      expect(spyCacheGet).toHaveBeenCalledTimes(1);
      expect(spyCacheGet).toHaveBeenCalledWith('findAll');
      expect(spyRepository).toHaveBeenCalledTimes(1);
      expect(spyCacheSet).toHaveBeenCalledTimes(1);
      expect(spyCacheSet).toHaveBeenCalledWith(
        'findAll',
        [
          { id: 1, name: 'maths' },
          { id: 2, name: 'physics' },
        ],
        0,
      );
      expect(result).toStrictEqual([
        { id: 1, name: 'maths' },
        { id: 2, name: 'physics' },
      ]);
    });
  });

  describe('findOneById', () => {
    it('Should return a subject from an Id', async () => {
      const spySubjectRepository = jest
        .spyOn(subjectRepository, 'findOneBy')
        .mockResolvedValue({
          id: 1,
          name: 'test-subject',
        });

      const result = await service.findOneById(1);

      expect(spySubjectRepository).toHaveBeenCalledTimes(1);
      expect(spySubjectRepository).toHaveBeenCalledWith({ id: 1 });
      expect(result).toStrictEqual({
        id: 1,
        name: 'test-subject',
      });
    });

    it('Should throw Error not found', async () => {
      jest.spyOn(subjectRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.findOneById(1)).rejects.toThrow(
        'Subject with id 1 not found',
      );
    });
  });

  describe('findOneByName', () => {
    it('Should return a subject from a name', async () => {
      const spySubjectRepository = jest
        .spyOn(subjectRepository, 'findOneBy')
        .mockResolvedValue({
          id: 1,
          name: 'test-subject',
        });

      const result = await service.findOneByName('test-subject');

      expect(spySubjectRepository).toHaveBeenCalledTimes(1);
      expect(spySubjectRepository).toHaveBeenCalledWith({
        name: 'test-subject',
      });
      expect(result).toStrictEqual({
        id: 1,
        name: 'test-subject',
      });
    });

    it('Should throw Error not found when name does not exist', async () => {
      jest.spyOn(subjectRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.findOneByName('missing')).rejects.toThrow(
        'Subject missing not found',
      );
    });
  });

  describe('createNewSubject', () => {
    it('Should create a new subject', async () => {
      const spySubjectRepository = jest
        .spyOn(subjectRepository, 'save')
        .mockResolvedValue({
          id: 1,
          name: 'test-subject',
        });

      const result = await service.createNewSubject({ name: 'test-subject' });

      expect(spySubjectRepository).toHaveBeenCalledTimes(1);
      expect(spySubjectRepository).toHaveBeenCalledWith({
        name: 'test-subject',
      });
      expect(result).toStrictEqual({
        id: 1,
        name: 'test-subject',
      });
    });
  });

  describe('findFavorite', () => {
    it('Should return favorite subject from config', () => {
      const spyConfigService = jest
        .spyOn(configService, 'get')
        .mockReturnValue('test-subject');

      const result = service.findFavorite();

      expect(spyConfigService).toHaveBeenCalledTimes(1);
      expect(spyConfigService).toHaveBeenCalledWith('FAVORITE_SUBJECT');
      expect(result).toBe('test-subject');
    });
  });
});
