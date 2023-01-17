import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { User } from '../entity/User';
import { DataSource } from "typeorm"


type Context = {
    dataSource?: DataSource
}
export const context: Context = {};

@ValidatorConstraint({ async: true })
export class uniqueInColumnConstraint implements ValidatorConstraintInterface {
    async validate(email: string) {
        console.log("uniqueInColumnConstraint.validate")
        if (context.dataSource) {
            return context.dataSource.getRepository(User).findOne({ where: { email: email } })
                .then(user => {
                    if (user) return false;
                    else return true
                });
        }
        return false;
    }
}

export function uniqueInColumn(validationOptions?: ValidationOptions) {
    return function (object: User, propertyName: string) {
        registerDecorator({
            name: "nasuColumn",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator:
                uniqueInColumnConstraint
        });
    };
}