import { IsString } from 'class-validator';

export class SearchQuery {
  @IsString()
  levelName: string;

  @IsString()
  subjectName: string;
}
