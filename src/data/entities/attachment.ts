import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./user";
import { IAttachment } from "../../domain/models/attachment";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "attachment",
})
export class Attachment extends Model<IAttachment> {
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    primaryKey: true,
  })
  declare id?: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
  })
  filePath!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  fileType!: string;

  @ForeignKey(() => User)
  @Column
  uploadedBy!: string;

  @Column
  relatedTo!: string; //meeting, record, asset

  @BelongsTo(() => User)
  user!: User;
}
