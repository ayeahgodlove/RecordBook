import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./user";
import { IMeetingMinute } from "../../domain/models/meeting-minute";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "meeting_minute",
})
export class MeetingMinute extends Model<IMeetingMinute> {
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    primaryKey: true,
  })
  declare id?: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content!: string;

  @Column
  meetingDate!: Date;

  @ForeignKey(() => User)
  @Column
  createdBy!: string;

  @BelongsTo(() => User)
  user!: User;
}
