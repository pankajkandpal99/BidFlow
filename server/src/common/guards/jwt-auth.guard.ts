import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import * as jwt from "jsonwebtoken";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    try {
      const authHeader = request.headers.authorization;

      if (!authHeader) {
        throw new UnauthorizedException("Authorization header is required");
      }

      const token = authHeader.split(" ")[1]; // Bearer TOKEN

      if (!token) {
        throw new UnauthorizedException("Token is required");
      }

      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new Error("JWT_SECRET is not configured");
      }

      const decoded = jwt.verify(token, jwtSecret) as any;

      if (!decoded || !decoded.sub || !decoded.email) {
        throw new UnauthorizedException("Invalid token payload");
      }

      // Attach user info to request object
      request.user = {
        id: decoded.sub,
        email: decoded.email,
        role: decoded.role,
        ...decoded,
      };

      return true;
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedException("Invalid token");
      }
      if (error instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedException("Token has expired");
      }
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException("Authentication failed");
    }
  }
}
