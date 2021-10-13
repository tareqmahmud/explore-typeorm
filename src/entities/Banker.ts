import { BaseEntity, Column, Entity } from "typeorm";
import Person from "./utils/Person";

@Entity("banker")
class Banker extends Person {
  @Column({
    unique: true,
    length: 10,
  })
  employee_number: number;
}

export default Banker;
