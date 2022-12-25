import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AuthUserDTO } from './AuthUserDTO';
import { validate, ValidationError } from 'class-validator';

export function stringified(errors: ValidationError[]): string {
  return JSON.stringify(errors)
}

describe('UserDto', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [AuthUserDTO],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    const userDto = new AuthUserDTO();
    expect(userDto).toBeDefined();
  });

  it('Return error when send invalid email',async  () => {
    const userDto = new AuthUserDTO();
    userDto.email = '';

    const errors = await validate(userDto, {skipMissingProperties: true})
    expect(errors).not.toBe(0)
    expect(stringified(errors)).toContain(`email must be an email`)
    expect(stringified(errors)).toContain(`email should not be empty`)
  });

  it('Return error when send invalid password',async  () => {
    const userDto = new AuthUserDTO();
    userDto.password = '';

    const errors = await validate(userDto, {skipMissingProperties: true})
    expect(errors.length).not.toBe(0)
    expect(stringified(errors)).toContain(`password should not be empty`)
  });
});




