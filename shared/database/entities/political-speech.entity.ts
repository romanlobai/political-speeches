import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PoliticalSpeech {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('varchar')
  public speaker: string;

  @Column('varchar')
  public topic: string;

  @Column('varchar')
  public date: string;

  @Column('int')
  public words: number;
}