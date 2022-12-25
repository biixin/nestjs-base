import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { CreateUserDTO } from './CreateUserDTO';
import { validate, ValidationError } from 'class-validator';

export function stringified(errors: ValidationError[]): string {
  return JSON.stringify(errors)
}

describe('UserDto', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [CreateUserDTO],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    const userDto = new CreateUserDTO();
    expect(userDto).toBeDefined();
  });

  it('Return error when send invalid name',async  () => {
    const userDto = new CreateUserDTO();
    userDto.name = '';

    const errors = await validate(userDto, {skipMissingProperties: true})
    expect(errors).not.toBe(0)
    expect(stringified(errors)).toContain(`name must be longer than or equal to 4 characters`)
    expect(stringified(errors)).toContain(`name should not be empty`)
  });

  it('Return error when send invalid email',async  () => {
    const userDto = new CreateUserDTO();
    userDto.email = '';

    const errors = await validate(userDto, {skipMissingProperties: true})
    expect(errors).not.toBe(0)
    expect(stringified(errors)).toContain(`email must be an email`)
    expect(stringified(errors)).toContain(`email should not be empty`)
  });

  it('Return error when send invalid password',async  () => {
    const userDto = new CreateUserDTO();
    userDto.password = '';

    const errors = await validate(userDto, {skipMissingProperties: true})
    expect(errors.length).not.toBe(0)
    expect(stringified(errors)).toContain(`password must be longer than or equal to 4 characters`)
    expect(stringified(errors)).toContain(`password should not be empty`)
  });
});




