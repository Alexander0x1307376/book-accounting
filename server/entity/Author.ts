import { Entity, Column, Unique, ManyToMany } from "typeorm";
import Model from "./Model";
import { Book } from "./Book";


@Entity('authors')
@Unique(['name', 'deathDate', 'birthDate'])
export class Author extends Model {

  @Column()
  name: string;

  @Column({ type: 'date', nullable: true })
  birthDate: Date

  @Column({ type: 'date', nullable: true })
  deathDate: Date

  @Column({ nullable: true })
  description: string

  @Column({ nullable: true })
  imageUrl: string

  @ManyToMany(() => Book, book => book.authors)
  books: Book[]
  
}