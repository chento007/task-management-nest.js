import { Module } from '@nestjs/common';
import { TypeOrmModule} from "@nestjs/typeorm";
import { AuthModule } from 'src/modules/auth/auth.module';
import { TasksModule } from 'src/modules/tasks/tasks.module';
import { ConfigModule,ConfigService } from '@nestjs/config';
import {
  typeormConfig
} from "./common/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeormConfig,
    }),

    TasksModule,
    AuthModule
  ],
})
export class AppModule { }
