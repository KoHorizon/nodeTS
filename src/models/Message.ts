import { BaseEntity, OneToMany , ManyToOne ,Column, Entity , PrimaryGeneratedColumn} from "typeorm";
import { User } from "./User";


@Entity()
export class Message extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.id)
    user: User ;

    @Column()
    content: string;
}