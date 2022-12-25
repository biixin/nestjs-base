import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { HttpModule } from './../../src/modules/user/user.module';
import { useContainer } from 'class-validator';
import { PrismaService } from '../../src/modules/instances/prisma.service';
import { makeUser } from '../factories/CreateUser-factory';


describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    prisma = app.get<PrismaService>(PrismaService);

    useContainer(app.select(HttpModule), {fallbackOnErrors: true}); 
    app.useGlobalPipes(new ValidationPipe({whitelist: true}));
    await app.init();

    await prisma.cleanDb()
  });

  describe("Create User Controller", () => {

    it('Should be able to create a User', async () => {

      const {body} = await request(app.getHttpServer()).post('/auth/signup')
      .send(makeUser({email: 'test@gmail.com'}))
      .expect(HttpStatus.CREATED)
      expect(body).toHaveProperty("id")

      const user = await prisma.user.findUnique({where: {
        email: 'test@gmail.com'
      }})
      expect(user).toBeTruthy()
    })

    it('Should not be able to create a user with exists email', async () => {

      await request(app.getHttpServer()).post('/auth/signup')
      .send(makeUser({
        email: 'test2@gmail.com'
      }))

      const {body} = await request(app.getHttpServer()).post('/auth/signup')
      .send(makeUser({
        email: 'test2@gmail.com'
      })).expect(HttpStatus.BAD_REQUEST)
      expect(body.message).toBe('Email Already Exists')

      const users = await prisma.user.findMany({where: {
        email: 'test2@gmail.com'
      }})
      expect(users.length).toBe(1)
      expect(users).toEqual(expect.arrayContaining([expect.objectContaining({email: 'test2@gmail.com'})]))
    })

    it('Return appError when send name with less than 4 characters', async () => {

      const {body} = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(makeUser({
        name: 'tt'
      })).expect(HttpStatus.BAD_REQUEST)
      expect(body.message).toEqual(expect.arrayContaining(['name must be longer than or equal to 4 characters']))

    })

    it('Return appError when send a invalid email', async () => {

      const {body} = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(makeUser({
        email: 'tt'
      })).expect(HttpStatus.BAD_REQUEST)
      expect(body.message).toEqual(expect.arrayContaining(['email must be an email']))
    })

    it('Return appError when send password with less than 4 characters', async () => {
      const {body} = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(makeUser({
        password: 'tt'
      })).expect(HttpStatus.BAD_REQUEST)
      expect(body.message).toEqual(expect.arrayContaining(['password must be longer than or equal to 4 characters']))
    })
  })
  afterAll(async () => {
    prisma
  })
});
