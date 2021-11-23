import { Entity, Column, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import Model from "./Model";
import { Author } from "./Author";
import { Category } from "./Category";


@Entity('books')
export class Book extends Model {

  @Column()
  name: string;

  @Column({ unique: true })
  isbn: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  imageUrl: string

  @ManyToOne(() => Category, category => category.books)
  category: Category

  @ManyToMany(() => Author, author => author.books)
  @JoinTable()
  authors: Author[]

}