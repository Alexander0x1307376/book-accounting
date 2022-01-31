import { Entity, Column, ManyToMany, ManyToOne } from "typeorm";
import Model from "./Model";
import { Author } from "./Author";
import { Category } from "./Category";
import { Image } from "./Image";


@Entity('books')
export class Book extends Model {

  @Column()
  name: string;

  @Column({ unique: true })
  isbn: string;

  @Column()
  description: string;

  @ManyToOne(() => Image, {
    onDelete: 'SET NULL'
  })
  image: Image;

  @ManyToOne(() => Category, category => category.books, {
    onDelete: 'SET NULL'
  })
  category: Category;

  @ManyToMany(() => Author, author => author.books, {
    onDelete: 'CASCADE'
  })
  authors: Author[];

}