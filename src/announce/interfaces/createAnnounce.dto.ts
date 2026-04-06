import { IsNumber, Max, Min, ValidateNested } from 'class-validator';
import { AddSubjectDto } from '../../subject/interfaces/addSubject.dto';
import { AddLevelDto } from '../../level/interfaces/addLevel.dto';
import { Type } from 'class-transformer';

export class CreateAnnounceDto {
  @ValidateNested()
  @Type(() => AddLevelDto)
  level: AddLevelDto;

  @ValidateNested()
  @Type(() => AddSubjectDto)
  subject: AddSubjectDto;

  @IsNumber()
  @Min(0)
  @Max(150)
  price: number;
}
