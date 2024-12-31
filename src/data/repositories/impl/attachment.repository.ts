import { Attachment } from "../../entities/attachment";
import { IAttachment } from "../../../domain/models/attachment";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";
import { IRepository } from "../contracts/repository.base";

export class AttachmentRepository
  implements IRepository<IAttachment, Attachment>
{
  /**
   *
   */
  constructor() {}
  findByName(name: string): Promise<Attachment | null> {
    throw new Error("Method not implemented.");
  }

  /**
   * Receives a Attachment as parameter
   * @attachment
   * returns void
   */
  async create(attachment: IAttachment): Promise<Attachment> {
    try {
      return await Attachment.create<Attachment>({ ...attachment });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @id
   * returns Attachment
   */
  async findById(id: string): Promise<Attachment | null> {
    try {
      const attachmentItem = await Attachment.findByPk(id);

      if (!attachmentItem) {
        throw new NotFoundException("Attachment", id);
      }
      return attachmentItem;
    } catch (error) {
      throw error;
    }
  }

  /*
   * Returns an array of Attachment
   */
  async getAll(): Promise<Attachment[]> {
    try {
      const categories = await Attachment.findAll();
      return categories;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a Attachment as parameter
   * @attachment
   * returns void
   */
  async update(attachment: IAttachment): Promise<Attachment> {
    const { id } = attachment;
    try {
      const attachmentItem: any = await Attachment.findByPk(id);

      console.log(attachment);
      if (!attachmentItem) {
        throw new NotFoundException("Attachment", id.toString());
      }

      return await attachmentItem.update({ ...attachment });
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
      const attachmentItem = await Attachment.findByPk(id);

      if (!attachmentItem) {
        throw new NotFoundException("Attachment", id);
      }

      await attachmentItem.destroy({
        force: true,
      });
    } catch (error) {
      throw error;
    }
  }
}
