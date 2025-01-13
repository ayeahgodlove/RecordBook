import { RecordType } from "../../entities/record-type";
import { IRecordType } from "../../../domain/models/record-type";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";
import { IRepository } from "../contracts/repository.base";

export class RecordTypeRepository implements IRepository<IRecordType, RecordType> {
  /**
   *
   */
  constructor() {}

  /**
   * Receives a RecordType as parameter
   * @recordType
   * returns void
   */
  async create(recordType: IRecordType): Promise<RecordType> {
    try {
      return await RecordType.create<RecordType>({ ...recordType });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @id
   * returns RecordType
   */
  async findById(id: string): Promise<RecordType | null> {
    try {
      const recordTypeItem = await RecordType.findByPk(id);

      if (!recordTypeItem) {
        throw new NotFoundException("RecordType", id);
      }
      return recordTypeItem;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @name
   * returns RecordType
   */
  async findByName(name: string): Promise<RecordType | null> {
    try {
      const recordTypeItem = await RecordType.findOne({ where: { name } });
      return recordTypeItem;
    } catch (error) {
      throw error;
    }
  }

  /*
   * Returns an array of RecordType
   */
  async getAll(): Promise<RecordType[]> {
    try {
      const recordTypes = await RecordType.findAll();
      return recordTypes;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a RecordType as parameter
   * @recordType
   * returns void
   */
  async update(recordType: IRecordType): Promise<RecordType> {
    const { id } = recordType;
    try {
      const recordTypeItem: any = await RecordType.findByPk(id);

      console.log(recordType);
      if (!recordTypeItem) {
        throw new NotFoundException("RecordType", id.toString());
      }

      return await recordTypeItem.update({ ...recordType });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a string as parameter
   * @id
   * returns void
   */
  async delete(id: string): Promise<void> {
    try {
      const recordTypeItem = await RecordType.findByPk(id);

      if (!recordTypeItem) {
        throw new NotFoundException("RecordType", id);
      }

      await recordTypeItem.destroy({
        force: true,
      });
    } catch (error) {
      throw error;
    }
  }
}
