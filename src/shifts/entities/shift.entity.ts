import { Doctor } from "src/doctors/entities/doctor.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('shifts')
export class Shift {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'start_time'})
    startTime: string;

    @Column({ name: 'end_time'})
    endTime: string;

    @OneToMany(() => Doctor, (doctor) => doctor.shift)
    doctors: Doctor[];
}
