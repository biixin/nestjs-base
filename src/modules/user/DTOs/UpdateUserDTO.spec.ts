import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { UpdateUserDTO } from './UpdateUserDTO';
import { validate, ValidationError } from 'class-validator';

export function stringified(errors: ValidationError[]): string {
  return JSON.stringify(errors)
}

describe('UpdateUserDTO', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [UpdateUserDTO],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    const userDto = new UpdateUserDTO();
    expect(userDto).toBeDefined();
  });

  it('Should not return any errors',async  () => {
    const userDto = new UpdateUserDTO();
    userDto.name = '';
    userDto.email = 'test@gmail.com';
    userDto.avatar = '';
    userDto.gender = '';
    userDto.isAdmin = true;
    userDto.password = '';

    const errors = await validate(userDto)
    expect(userDto.isAdmin).toBe(true)
    expect(errors.length).toBe(0)
  });

});




