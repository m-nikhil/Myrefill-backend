import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (roles) {
      const user = context.switchToHttp().getRequest().user;

      if (!this.matchRoles(roles, user.roles)) {
        throw new UnauthorizedException();
      }
    }
    return true;
  }

  matchRoles(roles: string[], userRoles: string[]) {
    return roles.filter(value => userRoles.includes(value)).length > 0;
  }
}
