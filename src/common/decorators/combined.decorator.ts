import { MinLength, MaxLength, Matches, IsEmail } from 'class-validator';
import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { titleCase } from 'title-case';
import { lowerCase } from 'lower-case';

/**
 * Combined decorator for Alpha ( string with min|max lengths ).
 * Converts string to lowercase with first letter caps.
 */
export function Word() {
  return applyDecorators(
    Matches(/^[A-Za-z ]+$/),
    MinLength(2),
    MaxLength(25),
    Transform((str: string) => {
      str = lowerCase(str);
      return titleCase(str);
    }),
  );
}

/**
 * Combined decorator for Text with max limit.
 */
export function Text() {
  return applyDecorators(MaxLength(100));
}

export function AwsLink() {
  return applyDecorators(MaxLength(1000));
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
