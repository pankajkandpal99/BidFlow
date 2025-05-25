import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  headers: Request['headers'];
  user?: {
    id: string;
    email: string;
    role?: string;
    [key: string]: any;
  };
}

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader) {
        throw new UnauthorizedException('Authorization header is required');
      }

      const token = authHeader.split(' ')[1]; // Bearer TOKEN
      
      if (!token) {
        throw new UnauthorizedException('Token is required');
      }

      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new Error('JWT_SECRET is not configured');
      }

      // Verify and decode the token
      const decoded = jwt.verify(token, jwtSecret) as any;
      
      if (!decoded || !decoded.id) {
        throw new UnauthorizedException('Invalid token payload');
      }

      // Attach user info to request object
      req.user = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
        ...decoded // Include any other payload data
      };

      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedException('Invalid token');
      }
      if (error instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedException('Token has expired');
      }
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Authentication failed');
    }
  }
}