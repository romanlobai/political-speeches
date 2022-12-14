import { Controller, Get, Logger, Query } from '@nestjs/common';
import { GetEvaluationDto } from './evaluation.dto';
import { IEvaluatedResult } from './evaluation.interface';
import { EvaluationService } from './evaluation.service';

@Controller('evaluation')
export class EvaluationController {
  constructor(
    private evaluationService: EvaluationService,
  ) {}

  @Get()
  private async getEvaluation(
    @Query() { url }: GetEvaluationDto,
  ): Promise<IEvaluatedResult> {
    try {
      const evaluated = await this.evaluationService.getEvaluation(url);

      return evaluated;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}
