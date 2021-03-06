import { Column, Entity, OneToMany, ManyToMany } from "typeorm";
import Person from "./utils/Person";
import Transaction from "./Transaction";
import Banker from "./Banker";

@Entity("client")
class Client extends Person {
  // number is integer
  // So use custom typeorm type called numeric -> It'll convert type to double/float
  @Column({ type: "float" })
  balance: number;

  @Column({ default: true, name: "active" })
  is_active: boolean;

  @Column({
    type: "simple-json",
    nullable: true,
  })
  additional_info: {
    age: number;
    hair_color: string;
  };

  @Column({
    type: "simple-array",
    default: [],
  })
  family_members: string;

  @OneToMany(() => Transaction, (transaction) => transaction.client)
  transactions: Transaction[];

  @ManyToMany(() => Banker, { cascade: true })
  bankers: Banker[];
}

export default Client;
