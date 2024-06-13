import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Movie } from '../../movies/entities/movie.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  rating: number;

  @ManyToOne(() => User, user => user.reviews)
  user: InsertPosition;

  @ManyToOne(() => Movie, movie => movie.reviews)
  movie: Movie;
}
