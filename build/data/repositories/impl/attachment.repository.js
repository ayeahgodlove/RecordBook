"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentRepository = void 0;
const attachment_1 = require("../../entities/attachment");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
class AttachmentRepository {
    /**
     *
     */
    constructor() { }
    findByName(name) {
        throw new Error("Method not implemented.");
    }
    /**
     * Receives a Attachment as parameter
     * @attachment
     * returns void
     */
    async create(attachment) {
        try {
            return await attachment_1.Attachment.create({ ...attachment });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @id
     * returns Attachment
     */
    async findById(id) {
        try {
            const attachmentItem = await attachment_1.Attachment.findByPk(id);
            if (!attachmentItem) {
                throw new not_found_exception_1.NotFoundException("Attachment", id);
            }
            return attachmentItem;
        }
        catch (error) {
            throw error;
        }
    }
    /*
     * Returns an array of Attachment
     */
    async getAll() {
        try {
            const categories = await attachment_1.Attachment.findAll();
            return categories;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a Attachment as parameter
     * @attachment
     * returns void
     */
    async update(attachment) {
        const { id } = attachment;
        try {
            const attachmentItem = await attachment_1.Attachment.findByPk(id);
            console.log(attachment);
            if (!attachmentItem) {
                throw new not_found_exception_1.NotFoundException("Attachment", id.toString());
            }
            return await attachmentItem.update({ ...attachment });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a string as parameter
     * @id
     * returns void
     */
    async delete(id) {
        try {
            const attachmentItem = await attachment_1.Attachment.findByPk(id);
            if (!attachmentItem) {
                throw new not_found_exception_1.NotFoundException("Attachment", id);
            }
            await attachmentItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.AttachmentRepository = AttachmentRepository;
