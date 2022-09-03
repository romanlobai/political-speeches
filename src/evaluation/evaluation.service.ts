import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PoliticalSpeech } from '@shared/database/entities/political-speech.entity';
import { Repository } from 'typeorm';
import { parse, transform } from 'csv/sync';

@Injectable()
export class EvaluationService {
  constructor(
    @InjectRepository(PoliticalSpeech)
    private politicalSpeechRepository: Repository<PoliticalSpeech>,
  ) {}

  public async getEvaluation(urls: string[]) {
    for (let i = 0; i < urls.length; i++) {
      await this.fetchAndSaveData(urls[i]);
    }

  }

  private async fetchAndSaveData(url: string) {
    const file = await fetch(url);
    const fileContent = await file.text();
    const rawRecords = parse(fileContent);
    const refinedRecords = transform(rawRecords, (data) => data.map(str => str.trim()));
    console.log({ rawRecords, refinedRecords });
  }

  private async evaluateData() {}
  private async emptyDatabaseAfterEvaluation() {}
}
