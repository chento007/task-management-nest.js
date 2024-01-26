import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from 'src/modules/auth/auth.module';
import { TasksModule } from 'src/modules/tasks/tasks.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  typeormConfig
} from "./common/config";
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './modules/user/user.module';
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler"
import { FileModule } from './modules/file/file.module';
import { PermissionModule } from './modules/permission/permission.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeormConfig,
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100,
    }]),
    UserModule,
    TasksModule,
    AuthModule,
    FileModule,
    ConfigModule,
    PermissionModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }

  ]
})
export class AppModule { }
