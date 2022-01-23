import { BaseEntity, OneToMany , ManyToOne ,Column, Entity , PrimaryGeneratedColumn} from "typeorm";
import { Message } from "./Message";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname:string;

    @Column()
    password:string;

    @OneToMany(type => Message, message => message.user) 
    message: Message[];


}


