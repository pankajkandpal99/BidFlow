import {
  IsEmail,
  IsString,
  MinLength,
  Matches,
  IsOptional,
} from "class-validator";

export class RegisterDto {
  @IsOptional()
  @IsString()
  @MinLength(3, { message: "Username must be at least 3 characters" })
  username?: string;

  @IsEmail({}, { message: "Invalid email address" })
  email!: string;

  @IsString()
  @MinLength(8, { message: "Password must be at least 8 characters" })
  @Matches(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  @Matches(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  @Matches(/[0-9]/, { message: "Password must contain at least one number" })
  @Matches(/[^A-Za-z0-9]/, {
    message: "Password must contain at least one special character",
  })
  password!: string;

  @IsString()
  @MinLength(8, { message: "Confirm Password must be at least 8 characters" })
  confirmPassword!: string;
}

export class LoginDto {
  @IsEmail({}, { message: "Invalid email address" })
  email!: string;

  @IsString()
  @MinLength(8, { message: "Password must be at least 8 characters" })
  @Matches(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  @Matches(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  @Matches(/[0-9]/, { message: "Password must contain at least one number" })
  @Matches(/[^A-Za-z0-9]/, {
    message: "Password must contain at least one special character",
  })
  password!: string;
}
