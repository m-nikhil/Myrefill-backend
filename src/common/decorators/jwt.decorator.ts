import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

/**
 * Combined decorator for JWT gaurd & bearer token
 */
export function JWT() {
  return applyDecorators(ApiBearerAuth(), UseGuards(AuthGuard('jwt')));
}
