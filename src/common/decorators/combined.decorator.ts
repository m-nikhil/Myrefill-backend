import {
  MinLength,
  MaxLength,
  Matches,
  IsAlpha,
  IsEmail,
} from 'class-validator';
import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { capitalCase } from 'change-case';

/**
 * Combined decorator for UUID
 */
export function UUID() {
  return applyDecorators(
    Matches(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
      {
        message: 'invalid uuid',
      },
    ),
  );
}

/**
 * Combined decorator for Alpha ( string with min|max lengths ).
 * Converts string to lowercase with first letter caps.
 */
export function Word() {
  return applyDecorators(
    IsAlpha(),
    MinLength(3),
    MaxLength(15),
    Transform((str: string) => capitalCase(str)),
  );
}

/**
 * Combined decorator for password.
 */
export function Password() {
  return applyDecorators(
    MinLength(4),
    MaxLength(15),
    Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: 'password too weak',
    }),
  );
}

/**
 * Combined decorator for email.
 * Converts the email to lowercase.
 */
export function Email() {
  return applyDecorators(
    IsEmail(),
    Transform((str: string) => str.toLowerCase()),
  );
}
