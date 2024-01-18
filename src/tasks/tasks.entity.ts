import { Column, Entity, Generated, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"
import { TaskStatus } from "./tasks-status.enum";

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated("uuid")
    uuid: string

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus
}