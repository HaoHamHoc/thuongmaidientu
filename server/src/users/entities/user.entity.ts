import { IsNotEmpty } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  @IsNotEmpty()
  email: string;

  @Column()
  @IsNotEmpty()
  hasspassword: string;

  @IsNotEmpty()
  @Column({ length: 50 })
  firstname: string;

  @IsNotEmpty()
  @Column({ length: 50 })
  surname: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: null })
  expiredCode: Date;

  @Column({ default: null })
  codeActive: string;

  @Column({ default: null })
  codeChangePassword: string;

  @Column({ default: null })
  expiredCodeChangePassword: Date;

  @Column({ default: null })
  expiredChangePassword: Date;

  @Column({ default: 5 })
  timePassword: number;
}
