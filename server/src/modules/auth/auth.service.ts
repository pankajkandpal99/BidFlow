import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { RegisterDto, LoginDto } from "./dto/auth.dto";
import * as bcrypt from "bcrypt";
import { DatabaseService } from "@/database/database.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto) {
    try {
      const existingUser = await this.databaseService.user.findUnique({
        where: { email: registerDto.email },
      });

      if (existingUser) {
        throw new HttpException(
          { error: "User with this email already exists" },
          HttpStatus.CONFLICT
        );
      }

      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(
        registerDto.password,
        saltRounds
      );

      const user = await this.databaseService.user.create({
        data: {
          username: registerDto.username,
          email: registerDto.email,
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      // console.log("User registered successfully:", user);

      return { user };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { error: "Registration failed" },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const user = await this.databaseService.user.findUnique({
        where: { email: loginDto.email },
      });

      if (!user) {
        throw new HttpException(
          { error: "Invalid email or password" },
          HttpStatus.UNAUTHORIZED
        );
      }

      const isPasswordValid = await bcrypt.compare(
        loginDto.password,
        user.password
      );
      if (!isPasswordValid) {
        throw new HttpException(
          { error: "Invalid email or password" },
          HttpStatus.UNAUTHORIZED
        );
      }

      const payload = { sub: user.id, email: user.email };
      const token = this.jwtService.sign(payload, { expiresIn:"7d" });

      const { password, ...userWithoutPassword } = user;

      return {
        token,
        user: userWithoutPassword,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { error: "Login failed" },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
