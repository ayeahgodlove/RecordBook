"use strict";
// src/presentation/dtos/financialRecord-request.dto.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialRecordRequestDto = void 0;
const class_validator_1 = require("class-validator");
const financial_record_1 = require("../../domain/models/financial-record");
const nanoid_1 = require("nanoid");
class FinancialRecordRequestDto {
    description;
    recordDate;
    amount;
    createdBy;
    constructor(data) {
        this.description = data.description;
        this.recordDate = data.recordDate;
        this.amount = data.amount;
        this.createdBy = data.createdBy;
    }
    toData() {
        return {
            ...financial_record_1.emptyFinancialRecord,
            id: (0, nanoid_1.nanoid)(10),
            description: this.description,
            createdBy: this.createdBy,
            amount: this.amount,
            recordDate: this.recordDate,
        };
    }
    toUpdateData(data) {
        return {
            id: data.id,
            description: data.description,
            createdBy: data.createdBy,
            amount: data.amount,
            recordDate: data.recordDate,
            incomeTypeId: data.incomeTypeId,
            expenseTypeId: data.expenseTypeId,
            recordTypeId: data.recordTypeId,
        };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FinancialRecordRequestDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], FinancialRecordRequestDto.prototype, "recordDate", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], FinancialRecordRequestDto.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FinancialRecordRequestDto.prototype, "createdBy", void 0);
exports.FinancialRecordRequestDto = FinancialRecordRequestDto;
