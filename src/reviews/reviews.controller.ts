import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Review } from './entities/review.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() review: Review) {
    return this.reviewsService.create(review);
  }
}
