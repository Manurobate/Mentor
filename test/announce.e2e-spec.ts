import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { App } from 'supertest/types';
import { AnnounceController } from '../src/announce/announce.controller';
import { AnnounceService } from '../src/announce/announce.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AnnounceEntity } from '../src/announce/entities/announce.entity';
import { SubjectService } from '../src/subject/subject.service';
import { LevelService } from '../src/level/level.service';
import request from 'supertest';

describe('Announce (e2e)', () => {
  let app: INestApplication<App>;
  const subjectService = { findOneByName: jest.fn() };
  const levelService = { findOneByName: jest.fn() };
  const repository = { save: jest.fn(), findOneBy: jest.fn() };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnnounceController],
      providers: [
        AnnounceService,
        {
          provide: getRepositoryToken(AnnounceEntity),
          useValue: repository,
        },
        SubjectService,
        LevelService,
      ],
    })
      .overrideProvider(SubjectService)
      .useValue(subjectService)
      .overrideProvider(LevelService)
      .useValue(levelService)
      .compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('Create announce', () => {
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

    it('should create an announce', () => {
      spyLevel.mockResolvedValue({ id: 1, name: 'test-level' });
      spySubject.mockResolvedValue({ id: 1, name: 'test-subject' });
      spyRepository.mockResolvedValue({
        id: 1,
        price: 100,
        level: { id: 1, name: 'test-level' },
        subject: { id: 1, name: 'test-subject' },
      });

      return request(app.getHttpServer())
        .post('/announce')
        .send(announceToCreate)
        .expect(201)
        .expect({
          id: 1,
          price: 100,
          level: { id: 1, name: 'test-level' },
          subject: { id: 1, name: 'test-subject' },
        });
    });

    it('should not create an announce with bad request negative price', () => {
      return request(app.getHttpServer())
        .post('/announce')
        .send({ ...announceToCreate, price: -1 })
        .expect(400)
        .expect({
          message: ['price must not be less than 0'],
          error: 'Bad Request',
          statusCode: 400,
        });
    });

    it('should not create an announce with bad request price too high', () => {
      return request(app.getHttpServer())
        .post('/announce')
        .send({ ...announceToCreate, price: 250 })
        .expect(400)
        .expect({
          message: ['price must not be greater than 150'],
          error: 'Bad Request',
          statusCode: 400,
        });
    });
  });

  describe('Search announce', () => {
    const spyLevel = jest.spyOn(levelService, 'findOneByName');
    const spySubject = jest.spyOn(subjectService, 'findOneByName');
    const spyRepository = jest.spyOn(repository, 'findOneBy');

    it('Should return an announce depending of the search query', () => {
      spyLevel.mockResolvedValue({ id: 1, name: 'test-level' });
      spySubject.mockResolvedValue({ id: 1, name: 'test-subject' });
      spyRepository.mockResolvedValue({
        id: 1,
        price: 100,
        level: { id: 1, name: 'test-level' },
        subject: { id: 1, name: 'test-subject' },
      });

      return request(app.getHttpServer())
        .get('/announce/search')
        .query({
          levelName: 'test-level',
          subjectName: 'test-subject',
        })
        .expect(200)
        .expect({
          id: 1,
          price: 100,
          level: { id: 1, name: 'test-level' },
          subject: { id: 1, name: 'test-subject' },
        });
    });
  });
});
