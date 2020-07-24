import {
  MinLength,
  MaxLength,
  Matches,
  IsAlpha,
  IsEmail,
} from 'class-validator';
import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import {capitalCase} from 'change-case';

/**
 * Combined decorator for Alpha ( string with min|max lengths ).
 * Converts string to lowercase with first letter caps.
 */
export function Word() {
  return applyDecorators(
    IsAlpha(),
    MinLength(3),
    MaxLength(15),
    Transform(
      (str: string) => capitalCase(str),
    ),
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
