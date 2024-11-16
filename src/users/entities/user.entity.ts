import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Role } from 'src/common/enums/role.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column({ type: 'enum', enum: Role, default: Role.PATIENT })
  role: Role;

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[];
}
