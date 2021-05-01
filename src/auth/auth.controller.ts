import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthCretentialsDTO } from "./dto/auth-credentials.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/signup")
  public signUp(@Body(ValidationPipe) authCredentialsDto: AuthCretentialsDTO) {
    return this.authService.signUp(authCredentialsDto);
  }
}
