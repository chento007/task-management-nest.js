import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserRespooneDto } from '../auth/dto/user-respone.dto';
import { UsersService } from './user.service';
import { User } from './user.entity';
import { TokenBaseRest } from '../auth/dto/token-base-rest.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from 'src/common/decorator/roles.decorator';
import { AppRoles } from 'src/common/enum/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { ApiTags } from '@nestjs/swagger';
import { checkAbilites } from 'src/common/decorator/abilities.decorator';

@Controller('api/users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @Roles([AppRoles.ADMINS])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  public getAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @checkAbilites({ action: 'manage', subject: 'all' })
  @Post()
  public create(@Body() createUserDto: CreateUserDto): Promise<TokenBaseRest> {
    return this.userService.create(createUserDto);
  }
}
