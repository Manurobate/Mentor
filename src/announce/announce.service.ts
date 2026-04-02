import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAnnounceDto } from './interfaces/createAnnounce.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnnounceEntity } from './entities/announce.entity';
import { SubjectService } from '../subject/subject.service';
import { LevelService } from '../level/level.service';

@Injectable()
export class AnnounceService {
  constructor(
    @InjectRepository(AnnounceEntity)
    private announceRepository: Repository<AnnounceEntity>,
    private subjectService: SubjectService,
    private levelService: LevelService,
  ) {}

  async searchAnnounce({
    levelName,
    subjectName,
  }: {
    levelName: string;
    subjectName: string;
  }): Promise<AnnounceEntity> {
    const level = await this.levelService.findOneByName(levelName);
    const subject = await this.subjectService.findOneByName(subjectName);
    const announce = await this.announceRepository.findOneBy({
      level,
      subject,
    });

    if (!announce) {
      throw new HttpException(
        `There is no announce for subject ${subjectName} and level ${levelName}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return announce;
  }

  async createAnnounce({
    price,
    level: { name: levelName },
    subject: { name: subjectName },
  }: CreateAnnounceDto): Promise<AnnounceEntity> {
    const level = await this.levelService.findOneByName(levelName);
    const subject = await this.subjectService.findOneByName(subjectName);

    return await this.announceRepository.save({
      price,
      level,
      subject,
    });
  }
}
