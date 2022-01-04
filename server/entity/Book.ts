import { Entity, Column, ManyToMany, ManyToOne } from "typeorm";
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

  @ManyToOne(() => Category, category => category.books, {
    onDelete: 'SET NULL'
  })
  category: Category

  @ManyToMany(() => Author, author => author.books, {
    onDelete: 'CASCADE'
  })
  authors: Author[]

}