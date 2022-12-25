
import { User } from './../../../entities/User';


export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      gender: user.gender,
      avatar: user.avatar,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt
    }
  }

  // static toDomain(raw: RawNotification): Notification {
  //   return new Notification({
  //     category: raw.category,
  //     content: new Content(raw.content),
  //     recipientId: raw.recipientId,
  //     readAt: raw.readAt,
  //     canceledAt: raw.canceledAt,
  //     createdAt: raw.createdAt
  //   }, raw.id) 
  // }
}