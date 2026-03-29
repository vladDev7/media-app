import * as zod from 'zod';

export const UserSchema = zod.object({
  id: zod.int(),
  email: zod.email().max(255),
  password: zod.string(),
  name: zod.string().max(255).nullable(),
  surname: zod.string().max(255).nullable(),
  created_at: zod.date(),
  updated_at: zod.date(),
});

export const UserCreateSchema = UserSchema.pick({
  email: true,
  password: true,
  name: true,
  surname: true,
});

export const UserInnerSchema = UserSchema.omit({
  password: true,
});

export const UserLoginSchema = zod.object({
  user: UserInnerSchema,
});

export type UserDto = zod.infer<typeof UserSchema>;
export type UserCreateDto = zod.infer<typeof UserCreateSchema>;
export type UserInnerDto = zod.infer<typeof UserInnerSchema>;
export type UserLoginDto = zod.infer<typeof UserLoginSchema>;
