import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PoliticalSpeech } from '@shared/database/entities/political-speech.entity';
import { EvaluationController } from './evaluation.controller';
import { EvaluationService } from './evaluation.service';

@Module({
  imports: [TypeOrmModule.forFeature([PoliticalSpeech])],
  controllers: [EvaluationController],
  providers: [EvaluationService],
})
export class EvaluationModule {}
