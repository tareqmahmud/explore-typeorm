import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
class Client extends BaseEntity {
  @PrimaryColumn({
    type: "uuid",
  })
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, length: 10 })
  card_number: string;

  // number is integer
  // So use custom typeorm type called numeric -> It'll convert type to double/float
  @Column({ type: "numeric" })
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
}

export default Client;
