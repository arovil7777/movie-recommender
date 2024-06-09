import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post('fetch')
  fetchMoviesFromTMDb() {
    return this.moviesService.fetchMoviesFromTMDb();
  }
}
