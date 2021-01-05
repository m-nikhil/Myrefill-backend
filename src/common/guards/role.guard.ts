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
      const idParam = context.switchToHttp().getRequest().params?.id;
      if (
        !(
          this.matchRoles(roles, user.roles) ||
          this.selfCheck(roles, user.userId, idParam)
        )
      ) {
        throw new UnauthorizedException();
      }
    }
    return true;
  }

  matchRoles(roles: string[], userRoles: string[]) {
    return roles.filter(value => userRoles.includes(value)).length > 0;
  }

  /**
   * check for 'self' role, a specific role
   * that check if current user is the owner of the
   * resource.
   */
  selfCheck(roles: string[], userId: string, idParam: string) {
    if (roles.includes('user')) {
      if (userId == idParam) {
        return true;
      }
    }
    return false;
  }
}
