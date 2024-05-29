import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { Hash } from 'src/utils/Hash';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenBaseRest } from '../auth/dto/token-base-rest.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  public async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async create(createUserDto: CreateUserDto): Promise<TokenBaseRest> {
    let { email, password, confirmedPassword, username } = createUserDto;

    const isEmilExsit = await this.userRepository.findOneBy({ email: email });
    if (isEmilExsit) {
      throw new BadRequestException('Email is already exist.');
    }

    const isUsernameExist = await this.userRepository.findAndCountBy({
      username: username,
    });
    if (isEmilExsit) {
      throw new BadRequestException('Username is already exist.');
    }

    password = await Hash.makeHash(password);

    const user = await this.userRepository.save({ email, password, username });

    const token = await this.getTokens(user.id);

    await this.updateRefreshToken(user.id, token.refresh);

    return token;
  }

  public async updateRefreshToken(userId: number, refresh: string) {
    const hashedRefreshToken = await Hash.makeHash(refresh);
    await this.userRepository.update(userId, {
      refresh: hashedRefreshToken,
    });
  }

  public async getTokens(userId: number) {
    const [access, refresh] = await Promise.all([
      this.jwtService.signAsync(
        { id: userId },
        {
          secret: this.configService.get<string>('JWT_SECRET_KEY'),
          expiresIn: this.configService.get<string>('JWT_EXPIRATION_TIME'),
        },
      ),
      this.jwtService.signAsync(
        { id: userId },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get<string>(
            'JWT_REFRESH_EXPIRATION_TIME',
          ),
        },
      ),
    ]);

    return {
      access,
      refresh,
    };
  }

  public async get(userId: number) {
    return await this.userRepository.findBy({ id: userId });
  }
}
