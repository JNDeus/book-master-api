import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('books')
export class BookEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  isbn: string;

  @Column({ nullable: false })
  author: string;

  @Column({ nullable: false })
  publisher: string;

  @Column({ nullable: false })
  year: number;

  @Column({ default: '' })
  language: string;

  @Column({ default: 0 })
  weight: number;

  @Column({ default: 0 })
  length: number;

  @Column({ default: 0 })
  width: number;

  @Column({ default: 0 })
  height: number;
}
