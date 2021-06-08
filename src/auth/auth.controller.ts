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

  @Post("/signin")
  public signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCretentialsDTO
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  /*   @Post("/test")
  @UseGuards(AuthGuard()) //Aplies the scope of Auth to the method or controller
  public test(@GetUser() user: User) {
    console.log(user);
  } */
}
