import { Entity, Column, PrimaryGeneratedColumn, InsertEvent, EventSubscriber, EntitySubscriberInterface, Index } from "typeorm"
import { IsNotEmpty, validate } from "class-validator";
import { uniqueInColumn } from "../constraints/uniqueInColumn";
import SetPasswordDTO from "./setPasswordDTO";
import * as bcrypt from 'bcrypt';
import { ValidationError } from "../lib/validationError";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number | undefined

    @Column()
    @IsNotEmpty()
    firstName!: string

    @Column()
    @IsNotEmpty()
    lastName!: string

    @Index("emailIndex", { unique: true })
    @Column({
        transformer: {

            from: (value: string) => {
                return value;
            },
            to: (value: string) => {
                return value.toLowerCase()
            }
        }
    })
    @Column()
    @uniqueInColumn({ message: "email is already taken" })
    email!: string

    @Column()
    @IsNotEmpty()
    passwordHash!: string
    async setPassword({ password, passwordConfirmation }: SetPasswordDTO) {
        if (password !== passwordConfirmation) {
            throw new ValidationError("password are not identical")
        }

        //90 equals sets of character accepted in password
        if (Math.log2(90 ** password.length) > 80) {
            this.passwordHash = await bcrypt.hash(password, 10);
        } else {
            throw new ValidationError("password is too weak")
        }

    }

    async checkPassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.passwordHash)
    }

}



