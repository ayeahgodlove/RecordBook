"use strict";
// src/presentation/dtos/expenseType-request.dto.ts
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
exports.ExpenseTypeRequestDto = void 0;
const class_validator_1 = require("class-validator");
const expense_type_1 = require("../../domain/models/expense-type");
const nanoid_1 = require("nanoid");
class ExpenseTypeRequestDto {
    name;
    description;
    constructor(data) {
        this.name = data.name;
        this.description = data.description;
    }
    toData() {
        return {
            ...expense_type_1.emptyExpenseType,
            id: (0, nanoid_1.nanoid)(10),
            name: this.name,
            description: this.description,
        };
    }
    toUpdateData(data) {
        return {
            id: data.id,
            name: data.name,
            description: data.description,
        };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(4, 25),
    __metadata("design:type", String)
], ExpenseTypeRequestDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ExpenseTypeRequestDto.prototype, "description", void 0);
exports.ExpenseTypeRequestDto = ExpenseTypeRequestDto;
