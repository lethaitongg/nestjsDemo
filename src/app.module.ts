import { Module } from '@nestjs/common';
import { AuthModule } from './@core/auth/auth.module';
import { UsersModule } from './@core/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './@core/user/entities/user.entity';
import { Profile } from './@core/user/entities/profile.entity';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({ envFilePath: ['.env.local'] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: +configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [User, Profile],
          synchronize: true,
        };
      },
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();

        return dataSource;
      },
    }),
  ],
  providers: [],
})
export class AppModule {}
