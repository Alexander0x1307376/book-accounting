import { Entity, Column, OneToMany, ManyToOne } from "typeorm";
import { Book } from "./Book";
import Model from "./Model";


@Entity('categories')
export class Category extends Model {

  @Column({ length: 40, unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Book, book => book.category)
  books: Book[]

  @ManyToOne(() => Category, category => category.children, {
    onDelete: 'SET NULL',
    nullable: true
  })
  parent: Category | null;

  @OneToMany(() => Category, category => category.parent)
  children: Category[];
  
}