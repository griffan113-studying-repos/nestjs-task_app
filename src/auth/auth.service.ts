import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthCretentialsDTO } from "./dto/auth-credentials.dto";
import { UserRepository } from "./user.repository";
import { IJwtPayload } from "./jwt-payload.interface";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  public signUp(authCretentialsDTO: AuthCretentialsDTO): Promise<void> {
    return this.userRepository.signUp(authCretentialsDTO);
  }

  public async signIn(
    authCredentialsDto: AuthCretentialsDTO
  ): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validatePassword(
      authCredentialsDto
    );

    if (!username) {
      throw new UnauthorizedException("Invalid credentials.");
    }
    const payload: IJwtPayload = { username };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
