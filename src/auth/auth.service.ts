import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthCretentialsDTO } from "./dto/auth-credentials.dto";
import { UserRepository } from "./user.repository";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {}

  public signUp(authCretentialsDTO: AuthCretentialsDTO): Promise<void> {
    return this.userRepository.signUp(authCretentialsDTO);
  }
}
