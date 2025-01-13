import { RecordType } from "../../data/entities/record-type";
import { IRepository } from "../../data/repositories/contracts/repository.base";
import { IRecordType } from "../models/record-type";
export class RecordTypeUseCase {
  /**
   *
   */
  constructor(
    private readonly recordTypeRepository: IRepository<IRecordType, RecordType>
  ) {}

  async createRecordType(recordType: IRecordType): Promise<RecordType> {
    const existingRecordType = await this.recordTypeRepository.findByName(
      recordType.name
    );

    if (existingRecordType) {
      throw new Error("RecordType already exists");
    }

    // const _recordType = new RecordType({recordType});
    //because it's already done in the Repository
    return this.recordTypeRepository.create(recordType);
  }

  async getAll(): Promise<RecordType[]> {
    return this.recordTypeRepository.getAll();
  }

  async getRecordTypeById(id: string): Promise<RecordType | null> {
    return this.recordTypeRepository.findById(id);
  }

  async updateRecordType(recordType: IRecordType): Promise<RecordType> {
    const { id, name, description } = recordType;
    const obj: IRecordType = {
      id,
      name,
      description,
    };
    return this.recordTypeRepository.update(obj);
  }

  async deleteRecordType(id: string): Promise<void> {
    return this.recordTypeRepository.delete(id);
  }
}
