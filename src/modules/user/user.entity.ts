import { IsDate, IsEmail } from "class-validator";
import { CommonEntity } from "src/common/entity/common.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, Generated, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends CommonEntity {

    @Column({
        type: "text",
        nullable: true,
        unique: true
    })
    username: string;

    @IsEmail()
    @Column({
        type: "text",
        unique: true,
    })
    email: string;

    @Column({
        type : "text"
    })
    password: string;

    @Column({
        nullable: true,
      })
      // @Exclude()
    public refreshToken?: string;
    

}