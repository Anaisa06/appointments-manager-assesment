import { AppointmentStatus } from "src/common/enums/appointmentStatus.enum";
import { Doctor } from "src/doctors/entities/doctor.entity";
import { Speciality } from "src/specialities/entities/speciality.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('appointments')
export class Appointment {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    date: Date;

    @Column()
    time: string;

    @Column({ type: 'enum', enum: AppointmentStatus, default: AppointmentStatus.PENDING })
    status: AppointmentStatus;

    @Column()
    reason: string;

    @Column({ nullable: true })
    notes: string;

    @ManyToOne(() => User, (user) => user.appointments)
    user: User;

    @ManyToOne(() => Doctor, (doctor) => doctor.appointments)
    doctor: Doctor;

    @ManyToOne(() => Speciality, (speciality) => speciality.appointments)
    speciality: Speciality;
}
