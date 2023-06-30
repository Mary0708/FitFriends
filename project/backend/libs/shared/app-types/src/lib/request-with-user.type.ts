import { User } from "@fit-friends/shared/app-types";

export type RequestWithUser = {
  user: Pick<User, 'id' | 'email' | 'name' | 'role'>;
}
