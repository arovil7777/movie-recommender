import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MoviesService {
  private readonly tmdbApiKey = ''; // 본인이 발급받은 TMDb API Key 입력

  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
    private readonly httpService: HttpService,
  ) { }

  async fetchMoviesFromTMDb(): Promise<Movie[]> {
    const { data } = await firstValueFrom(
      this.httpService.get(`https://api.themoviedb.org/3/movie/popular?api_key=${this.tmdbApiKey}`),
    );

    const movies = data.results.map(movie => ({
      title: movie.title,
      description: movie.overview,
      releaseDate: movie.release_date,
    }));

    return this.moviesRepository.save(movies);
  }

  findAll(): Promise<Movie[]> {
    return this.moviesRepository.find();
  }
}
