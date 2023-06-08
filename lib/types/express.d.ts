import { UserDTO } from "../model";

export { };

declare global {
    namespace Express {
        interface Request {
            session?: {
                user: UserDTO,
                exp: number
            }
        }
    }
}
