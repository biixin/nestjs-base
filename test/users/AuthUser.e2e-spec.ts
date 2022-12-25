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

    await request(app.getHttpServer()).post('/auth/signup')
    .send(makeUser())

    await request(app.getHttpServer()).post('/auth/signup')
    .send(makeUser({email: 'test2@gmail.com'}))
  });

  describe("Auth User Controller", () => {

    it('Should be able to authenticate a user with correct data', async () => {

      const {body} = await request(app.getHttpServer()).post('/auth/session')
      .send({
        email: 'test@gmail.com',
        password: 'test'
      }).expect(HttpStatus.CREATED)
      expect(body).toHaveProperty("token")
    })

    it('Return error when send request without a email', async () => {

      const {body} = await request(app.getHttpServer()).post('/auth/session')
      .send({
        password: 'test'
      }).expect(HttpStatus.BAD_REQUEST)

      expect(body.message).toEqual(expect.arrayContaining(['email should not be empty']))
    })

    it('Return error when send a invalid email', async () => {

      const {body} = await request(app.getHttpServer()).post('/auth/session')
      .send(makeUser({
        email: 'test'
      })).expect(HttpStatus.BAD_REQUEST)

      expect(body.message).toEqual(expect.arrayContaining(['email must be an email']))
    })

    it('Return error when send request without a password', async () => {

      const {body} = await request(app.getHttpServer()).post('/auth/session')
      .send({
        email: 'test@gmail.com'
      }).expect(HttpStatus.BAD_REQUEST)

      expect(body.message).toEqual(expect.arrayContaining(['password should not be empty']))
    })

    it('Return AppError when email does not exists ', async () => {

      const {body} = await request(app.getHttpServer()).post('/auth/session')
        .send(makeUser({
          email: 'wrong@gmail.com'
      })).expect(HttpStatus.BAD_REQUEST)

      expect(body).toHaveProperty("message", "Email or password is wrong")
    })

    // it('Return AppError when password does not match ', async () => {

    //   const {body} = await request(app.getHttpServer()).post('/auth/session')
    //   .send(makeUser({
    //     password: 'wrong'
    //   })).expect(HttpStatus.BAD_REQUEST)

    //   console.log(body)
    //   expect(body).toHaveProperty("message", "Email or password is wrong")
    // })

    // it('Return appError when send name with less than 4 characters', async () => {

    //   const {body} = await request(app.getHttpServer())
    //   .post('/auth/signup')
    //   .send(makeUser({
    //     name: 'tt'
    //   })).expect(HttpStatus.BAD_REQUEST)
    //   expect(body.message).toEqual(expect.arrayContaining(['name must be longer than or equal to 4 characters']))

    // })

    // it('Return appError when send a invalid email', async () => {

    //   const {body} = await request(app.getHttpServer())
    //   .post('/auth/signup')
    //   .send(makeUser({
    //     email: 'tt'
    //   })).expect(HttpStatus.BAD_REQUEST)
    //   expect(body.message).toEqual(expect.arrayContaining(['email must be an email']))
    // })

    // it('Return appError when send password with less than 4 characters', async () => {
    //   const {body} = await request(app.getHttpServer())
    //   .post('/auth/signup')
    //   .send(makeUser({
    //     password: 'tt'
    //   })).expect(HttpStatus.BAD_REQUEST)
    //   expect(body.message).toEqual(expect.arrayContaining(['password must be longer than or equal to 4 characters']))
    // })
  })
});
