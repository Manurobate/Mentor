import { Test, TestingModule } from '@nestjs/testing';
import { AnnounceService } from './announce.service';
import { SubjectService } from '../subject/subject.service';
import { LevelService } from '../level/level.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AnnounceEntity } from './entities/announce.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('Tests AnnounceService', () => {
  let service: AnnounceService;
  const subjectService = { findOneByName: jest.fn() };
  const levelService = { findOneByName: jest.fn() };
  const repository = { save: jest.fn(), findOneBy: jest.fn() };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnnounceService,
        { provide: getRepositoryToken(AnnounceEntity), useValue: repository },
      ],
    })
      .useMocker((token) => {
        if (token === SubjectService) {
          return subjectService;
        }
        if (token === LevelService) {
          return levelService;
        }
      })
      .compile();

    service = module.get(AnnounceService);
  });

  describe('createAnnounce', () => {
    const spyLevel = jest.spyOn(levelService, 'findOneByName');
    const spySubject = jest.spyOn(subjectService, 'findOneByName');
    const spyRepository = jest.spyOn(repository, 'save');
    const announceToCreate = {
      price: 100,
      level: {
        name: 'test-level',
      },
      subject: {
        name: 'test-subject',
      },
    };

    it('Should create an annouce ', async () => {
      spyLevel.mockResolvedValue({ id: 1, name: 'test-level' });
      spySubject.mockResolvedValue({ id: 1, name: 'test-subject' });
      spyRepository.mockResolvedValue({
        id: 1,
        price: 100,
        level: { id: 1, name: 'test-level' },
        subject: { id: 1, name: 'test-subject' },
      });

      const result = await service.createAnnounce(announceToCreate);
      expect(spyLevel).toHaveBeenCalledTimes(1);
      expect(spyLevel).toHaveBeenCalledWith('test-level');
      expect(spySubject).toHaveBeenCalledTimes(1);
      expect(spySubject).toHaveBeenCalledWith('test-subject');
      expect(spyRepository).toHaveBeenCalledTimes(1);
      expect(spyRepository).toHaveBeenCalledWith({
        price: 100,
        level: {
          id: 1,
          name: 'test-level',
        },
        subject: {
          id: 1,
          name: 'test-subject',
        },
      });
      expect(result).toStrictEqual({
        id: 1,
        price: 100,
        level: { id: 1, name: 'test-level' },
        subject: { id: 1, name: 'test-subject' },
      });
    });

    it('Should not create an announce if level does not exist', async () => {
      spyLevel.mockRejectedValue(
        new HttpException('Level not found', HttpStatus.NOT_FOUND),
      );
      spySubject.mockResolvedValue({ id: 1, name: 'test-subject' });

      await expect(service.createAnnounce(announceToCreate)).rejects.toThrow(
        'Level not found',
      );
      expect(spyRepository).not.toHaveBeenCalled();
    });

    it('Should not create an announce if subject does not exist', async () => {
      spySubject.mockRejectedValue(
        new HttpException('Subject not found', HttpStatus.NOT_FOUND),
      );
      spyLevel.mockResolvedValue({ id: 1, name: 'test-level' });

      await expect(service.createAnnounce(announceToCreate)).rejects.toThrow(
        'Subject not found',
      );
      expect(spyRepository).not.toHaveBeenCalled();
    });
  });

  describe('searchAnnounce', () => {
    const spyLevel = jest.spyOn(levelService, 'findOneByName');
    const spySubject = jest.spyOn(subjectService, 'findOneByName');
    const spyRepository = jest.spyOn(repository, 'findOneBy');
    const announceToSearch = {
      levelName: 'test-level',
      subjectName: 'test-subject',
    };

    it('Should return an announce depending of the search query', async () => {
      spyLevel.mockResolvedValue({ id: 1, name: 'test-level' });
      spySubject.mockResolvedValue({ id: 1, name: 'test-subject' });
      spyRepository.mockResolvedValue({
        id: 1,
        price: 100,
        level: { id: 1, name: 'test-level' },
        subject: { id: 1, name: 'test-subject' },
      });

      const result = await service.searchAnnounce(announceToSearch);
      expect(result).toStrictEqual({
        id: 1,
        price: 100,
        level: { id: 1, name: 'test-level' },
        subject: { id: 1, name: 'test-subject' },
      });
      expect(spyLevel).toHaveBeenCalledTimes(1);
      expect(spyLevel).toHaveBeenCalledWith('test-level');
      expect(spySubject).toHaveBeenCalledTimes(1);
      expect(spySubject).toHaveBeenCalledWith('test-subject');
      expect(spyRepository).toHaveBeenCalledTimes(1);
    });

    it('Should not return an announce if level does not exist', async () => {
      spyLevel.mockRejectedValue(
        new HttpException('Level not found', HttpStatus.NOT_FOUND),
      );
      spySubject.mockResolvedValue({ id: 1, name: 'test-subject' });

      await expect(service.searchAnnounce(announceToSearch)).rejects.toThrow(
        'Level not found',
      );
      expect(spyRepository).not.toHaveBeenCalled();
    });

    it('Should not return an announce if subject does not exist', async () => {
      spySubject.mockRejectedValue(
        new HttpException('Subject not found', HttpStatus.NOT_FOUND),
      );
      spyLevel.mockResolvedValue({ id: 1, name: 'test-level' });

      await expect(service.searchAnnounce(announceToSearch)).rejects.toThrow(
        'Subject not found',
      );
      expect(spyRepository).not.toHaveBeenCalled();
    });

    it('Should throw an error if no announce found', async () => {
      spyLevel.mockResolvedValue({ id: 1, name: 'test-level' });
      spySubject.mockResolvedValue({ id: 1, name: 'test-subject' });
      spyRepository.mockResolvedValue(null);

      await expect(service.searchAnnounce(announceToSearch)).rejects.toThrow(
        'There is no announce for subject test-subject and level test-level',
      );
      expect(spyLevel).toHaveBeenCalledTimes(1);
      expect(spyLevel).toHaveBeenCalledWith('test-level');
      expect(spySubject).toHaveBeenCalledTimes(1);
      expect(spySubject).toHaveBeenCalledWith('test-subject');
      expect(spyRepository).toHaveBeenCalledTimes(1);
    });
  });
});
