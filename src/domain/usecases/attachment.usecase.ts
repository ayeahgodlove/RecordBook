import { Attachment } from "../../data/entities/attachment";
import { IRepository } from "../../data/repositories/contracts/repository.base";
import { IAttachment } from "../models/attachment";
export class AttachmentUseCase {
  /**
   *
   */
  constructor(
    private readonly attachmentRepository: IRepository<IAttachment, Attachment>
  ) {}

  async createAttachment(attachment: IAttachment): Promise<Attachment> {
    //because it's already done in the Repository
    return this.attachmentRepository.create(attachment);
  }

  async getAll(): Promise<Attachment[]> {
    return this.attachmentRepository.getAll();
  }

  async getAttachmentById(id: string): Promise<Attachment | null> {
    return this.attachmentRepository.findById(id);
  }

  async updateAttachment(attachment: IAttachment): Promise<Attachment> {
    return this.attachmentRepository.update(attachment);
  }

  async deleteAttachment(id: string): Promise<void> {
    return this.attachmentRepository.delete(id);
  }
}
