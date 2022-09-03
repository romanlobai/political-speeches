import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PoliticalSpeech } from '@shared/database/entities/political-speech.entity';
import { Repository } from 'typeorm';
import { parse, transform } from 'csv/sync';
import { IEvaluatedResult } from './evaluation.interface';

@Injectable()
export class EvaluationService {
  constructor(
    @InjectRepository(PoliticalSpeech)
    private politicalSpeechRepository: Repository<PoliticalSpeech>,
  ) {}

  public async getEvaluation(urls: string[]): Promise<IEvaluatedResult> {
    await Promise.all(
      urls.map((url: string) => this.fetchAndSaveData(url))
    );
    
    const evaluation = await this.evaluateData();
    await this.emptyDatabaseAfterEvaluation();

    return evaluation;
  }

  private async fetchAndSaveData(url: string): Promise<PoliticalSpeech[]> {
    const file = await fetch(url);
    const fileContent = await file.text();

    const rawRecords = parse(fileContent);
    const refinedRecords = transform(rawRecords, (data) => data.map((str: string) => str.trim()));

    const entities: PoliticalSpeech[] = [];
    for (let i = 1; i < refinedRecords.length; i++) {
      const [speaker, topic, date, words] = refinedRecords[i];
      const entity = this.politicalSpeechRepository.create({
        speaker,
        topic,
        date,
        words,
      });
      entities.push(entity);
    }
    const savedData = await this.politicalSpeechRepository.save(entities);

    return savedData;
  }

  private async evaluateData(): Promise<IEvaluatedResult> {
    // Here I make queries without ORM to show how it will look on SQL level

    // Which politician gave the most speeches in 2013?
    const [mostSpeeches] = await this.politicalSpeechRepository.query(`
      SELECT speaker
      FROM political_speech
      GROUP BY speaker, date
      HAVING date > '2013-01-01'
      LIMIT 1;
    `);

    // Which politician gave the most speeches on the topic „Internal Security"?
    const [mostSecurity] = await this.politicalSpeechRepository.query(`
      SELECT speaker
      FROM political_speech
      GROUP BY speaker, topic
      HAVING topic = 'Internal Security'
      LIMIT 1;
    `);

    // Which politician used the fewest words (in total)?
    const [leastWordy] = await this.politicalSpeechRepository.query(`
      SELECT speaker
      FROM political_speech
      GROUP BY speaker, words
      ORDER BY words ASC
      LIMIT 1;
    `);

    return {
      mostSpeeches: mostSpeeches?.speaker || null,
      mostSecurity: mostSecurity?.speaker || null,
      leastWordy: leastWordy?.speaker || null,
    };
  }

  private async emptyDatabaseAfterEvaluation(): Promise<void> {
    await this.politicalSpeechRepository.query('TRUNCATE TABLE political_speech;');
  }
}
