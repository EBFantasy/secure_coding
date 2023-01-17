import { User } from "../entity/User";
import { faker } from '@faker-js/faker';


export const generateUser = (user?: User): User => {

    const Users = new User();
    Users.id = user?.id ?? faker.datatype.number();
    Users.email = user?.email ?? faker.internet.email();
    Users.firstName = user?.firstName ?? faker.name.firstName();
    Users.lastName = user?.lastName ?? faker.name.lastName();
    Users.passwordHash = user?.passwordHash ?? "1 ";

    return Users;
}