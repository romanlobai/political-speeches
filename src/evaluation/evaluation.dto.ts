import { Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';

export class GetEvaluationDto {
  @IsDefined()
  @Transform(({ value }) => Array.isArray(value) ? value : [value])
    url: string[];
}