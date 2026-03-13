import * as zod from 'zod';

export const UserSchema = zod.object({
  id: zod.int(),
  email: zod.email(),
  password: zod.string(),
  create_at: zod.date(),
  updated_at: zod.date(),
});

export const UserCreateSchema = UserSchema.pick({
  email: true,
  password: true,
});

export const UserLoginSchema = zod.object({
  user: UserCreateSchema,
});

export type UserDto = zod.infer<typeof UserSchema>;
export type UserCreateDto = zod.infer<typeof UserCreateSchema>;
export type UserLoginDto = zod.infer<typeof UserLoginSchema>;
