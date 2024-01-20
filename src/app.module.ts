import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from 'src/modules/auth/auth.module';
import { TasksModule } from 'src/modules/tasks/tasks.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  typeormConfig
} from "./common/config";
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guard/roles.guard';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from './modules/user/user.module';
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler"
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
    UserModule,
    TasksModule,
    AuthModule,
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100,
    }]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
    
  ]
})
export class AppModule { }
