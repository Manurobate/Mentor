import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AnnounceService } from './announce.service';
import { CreateAnnounceDto } from './interfaces/createAnnounce.dto';
import { AnnounceEntity } from './entities/announce.entity';

@Controller('announce')
export class AnnounceController {
  constructor(private announceService: AnnounceService) {}

  @Get('search')
  searchAnnounce(
    @Query('levelName') levelName: string,
    @Query('subjectName') subjectName: string,
  ) {
    return this.announceService.searchAnnounce({ levelName, subjectName });
  }

  @Post()
  createAnnounce(@Body() body: CreateAnnounceDto): Promise<AnnounceEntity> {
    return this.announceService.createAnnounce(body);
  }
}
