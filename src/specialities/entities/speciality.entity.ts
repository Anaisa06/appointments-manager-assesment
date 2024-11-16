import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('specialities')
export class Speciality {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Doctor, (doctor) => doctor.speciality)
  doctors: Doctor[];

  @OneToMany(() => Appointment, (appointment) => appointment.speciality)
  appointments: Appointment[];
}
