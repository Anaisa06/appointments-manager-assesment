import { Appointment } from "src/appointments/entities/appointment.entity";
import { Role } from "src/common/enums/role.enum";
import { Doctor } from "src/doctors/entities/doctor.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({ name: 'phone_number'})
    phoneNumber: string;

    @Column({ type: 'enum', enum: Role})
    role: Role;

    @OneToMany(() => Appointment, (appointment) => appointment.user)
    appointments: Appointment[];

    @OneToOne(() => Doctor, (doctor) => doctor.user)
    doctor: Doctor;
}
