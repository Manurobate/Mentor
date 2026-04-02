import { Test, TestingModule } from '@nestjs/testing';
import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';

describe('Tests SubjectController', () => {
  let controller: SubjectController;
  const service = {
    findAll: jest.fn(),
    findFavorite: jest.fn(),
    findOneById: jest.fn(),
    createNewSubject: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubjectController],
      providers: [SubjectService],
    })
      .overrideProvider(SubjectService)
      .useValue(service)
      .compile();

    controller = module.get<SubjectController>(SubjectController);
  });

  it('Should return all subjects', async () => {
    const spySubjectService = jest.spyOn(service, 'findAll').mockResolvedValue([
      { id: 1, name: 'maths' },
      { id: 2, name: 'physics' },
    ]);

    const result = await controller.findAll();

    expect(spySubjectService).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual([
      { id: 1, name: 'maths' },
      { id: 2, name: 'physics' },
    ]);
  });

  it('Should return favorite subject', () => {
    const spySubjectService = jest
      .spyOn(service, 'findFavorite')
      .mockReturnValue('maths');

    const result = controller.findFavorite();

    expect(spySubjectService).toHaveBeenCalledTimes(1);
    expect(result).toBe('maths');
  });

  it('Should return one subject by id', async () => {
    const spySubjectService = jest
      .spyOn(service, 'findOneById')
      .mockResolvedValue({ id: 1, name: 'maths' });

    const result = await controller.findOneById('1');

    expect(spySubjectService).toHaveBeenCalledTimes(1);
    expect(spySubjectService).toHaveBeenCalledWith(1);
    expect(result).toStrictEqual({ id: 1, name: 'maths' });
  });

  it('Should create a new subject', async () => {
    const spySubjectService = jest
      .spyOn(service, 'createNewSubject')
      .mockResolvedValue({ id: 1, name: 'maths' });

    const result = await controller.addSubject({ name: 'maths' });

    expect(spySubjectService).toHaveBeenCalledTimes(1);
    expect(spySubjectService).toHaveBeenCalledWith({ name: 'maths' });
    expect(result).toStrictEqual({ id: 1, name: 'maths' });
  });
});
