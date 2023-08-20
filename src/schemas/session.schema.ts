import { userSchema } from "./users.schema";

const sessionCreate = userSchema.pick({
  email: true,
  password: true,
});

export { sessionCreate };
