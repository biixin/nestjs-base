import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AppError } from './../../errors/AppError';

@Injectable()
export class ensureAdmin implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    if(req.user.isAdmin) {
      return true;
    }
    throw new AppError("User is not a admin", 403);
  }
  
}