import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginSchema, registerSchema } from '@/schema/auth.schema';
import { fromZodError } from 'zod-validation-error';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: unknown) {
    // Validate with Zod schema
    const result = registerSchema.safeParse(body);
    if (!result.success) {
      throw new HttpException(
        { error: fromZodError(result.error).message },
        HttpStatus.BAD_REQUEST
      );
    }

    const registerDto = result.data;
    const authResult = await this.authService.register(registerDto);
    
    return {
      success: true,
      message: 'User registered successfully',
      data: authResult,
    };
  }

  @Post('login')
  async login(@Body() body: unknown) {
    // Validate with Zod schema
    const result = loginSchema.safeParse(body);
    if (!result.success) {
      throw new HttpException(
        { error: fromZodError(result.error).message },
        HttpStatus.BAD_REQUEST
      );
    }

    const loginDto = result.data;
    const authResult = await this.authService.login(loginDto);
    
    return {
      success: true,
      message: 'Login successful',
      data: authResult,
    };
  }
}