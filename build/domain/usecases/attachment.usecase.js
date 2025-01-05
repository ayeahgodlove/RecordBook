"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentUseCase = void 0;
class AttachmentUseCase {
    attachmentRepository;
    /**
     *
     */
    constructor(attachmentRepository) {
        this.attachmentRepository = attachmentRepository;
    }
    async createAttachment(attachment) {
        //because it's already done in the Repository
        return this.attachmentRepository.create(attachment);
    }
    async getAll() {
        return this.attachmentRepository.getAll();
    }
    async getAttachmentById(id) {
        return this.attachmentRepository.findById(id);
    }
    async updateAttachment(attachment) {
        return this.attachmentRepository.update(attachment);
    }
    async deleteAttachment(id) {
        return this.attachmentRepository.delete(id);
    }
}
exports.AttachmentUseCase = AttachmentUseCase;
