import { BaseEntity, Column, Entity, JoinTable, ManyToMany } from "typeorm";
import Person from "./utils/Person";
import Client from "./Client";

@Entity("banker")
class Banker extends Person {
  @Column({
    unique: true,
  })
  employee_number: number;

  @ManyToMany(() => Client)
  @JoinTable({
    name: "bankers_client",
    joinColumn: {
      name: "banker",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "client",
      referencedColumnName: "id",
    },
  })
  clients: Client[];
}

export default Banker;
