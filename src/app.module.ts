import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';
import { ReviewsModule } from './reviews/reviews.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Movie } from './movies/entities/movie.entity';
import { Review } from './reviews/entities/review.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ConfigModule을 전역 모듈로 설정
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [User, Movie, Review],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    MoviesModule,
    ReviewsModule,
    UsersModule,
  ],
})
export class AppModule {}
