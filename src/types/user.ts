import { User } from "@prisma/client";

export type CreateUserData = Omit<User,'id'>;

export type CreateLoginUserData = Omit<User, 'id'|'name'|'image'>;