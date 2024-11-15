import { Appointment } from "src/appointments/entities/appointment.entity";
import { Shift } from "src/shifts/entities/shift.entity";
import { Speciality } from "src/specialities/entities/speciality.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('doctors')
export class Doctor {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Shift, (shift) => shift.doctors)
    shift: Shift

    @OneToOne(() => User, (user) => user.doctor)
    user: User;

    @ManyToOne(() => Speciality, (speciality) => speciality.doctors)
    speciality: Speciality;

    @OneToMany(() => Appointment, (appointment) => appointment.doctor)
    appointments: Appointment[];
}
