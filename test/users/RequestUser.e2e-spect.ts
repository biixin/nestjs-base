import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { HttpModule } from './../../src/modules/user/user.module';
import { useContainer } from 'class-validator';
import { PrismaService } from '../../src/modules/instances/prisma.service';
import { makeUser } from '../factories/CreateUser-factory';
import { compare } from 'bcrypt';


describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let userId: string
  let token: string

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

    const {body} = await request(app.getHttpServer()).post('/auth/session')
    .send(makeUser())
    userId = body.user.id
    token = body.token
  });

  describe("Update User", () => {

    it('Should update a user email', async () => {
      const {body} = await request(app.getHttpServer()).post(`/users/update/${userId}`)
      .send({
        name: 'updated',
        email: 'updated@gmail.com',
        password: 'updated',
        gender: 'woman',
        avatar: 'updated'
      }).set({ Authorization: `Bearer ${token}`})
      .expect(HttpStatus.CREATED)
      expect(body.user).toEqual(expect.objectContaining({
        name: 'updated',
        email: 'updated@gmail.com',
        gender: 'woman',
        avatar: 'updated'
      }))

      const userUpdated = await prisma.user.findUnique({
        where: {email: 'updated@gmail.com'}
      })
      expect(userUpdated).toBeDefined()
      expect(userUpdated).toEqual(expect.objectContaining({
        name: 'updated',
        email: 'updated@gmail.com',
        gender: 'woman',
        avatar: 'updated'
      }))

      const passwordMatch = await compare('updated', userUpdated?.password as string)
      expect(passwordMatch).toEqual(true)
    })

  })
});
