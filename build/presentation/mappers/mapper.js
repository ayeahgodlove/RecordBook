"use strict";
// src/presentation/mappers/category-mapper.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleMapper = exports.BranchMapper = exports.UserRoleMapper = exports.RecordTypeMapper = exports.ExpenseTypeMapper = exports.IncomeTypeMapper = exports.UserMapper = exports.AttachmentMapper = exports.FinancialRecordMapper = exports.MeetingMinuteMapper = exports.AssetMapper = void 0;
class AssetMapper {
    toDTO(asset) {
        const entity = asset.toJSON();
        return entity;
    }
    toDTOs(assets) {
        const _assets = assets.map((asset) => {
            const entity = asset.toJSON();
            return entity;
        });
        return _assets;
    }
}
exports.AssetMapper = AssetMapper;
class MeetingMinuteMapper {
    toDTO(meetingMinute) {
        const entity = meetingMinute.toJSON();
        return entity;
    }
    toDTOs(meetingMinutes) {
        const _meetingMinutes = meetingMinutes.map((meetingMinute) => {
            const entity = meetingMinute.toJSON();
            return entity;
        });
        return _meetingMinutes;
    }
}
exports.MeetingMinuteMapper = MeetingMinuteMapper;
class FinancialRecordMapper {
    toDTO(financialRecord) {
        const entity = financialRecord.toJSON();
        return entity;
    }
    toDTOs(financialRecords) {
        const _financialRecords = financialRecords.map((financialRecord) => {
            const entity = financialRecord.toJSON();
            return entity;
        });
        return _financialRecords;
    }
}
exports.FinancialRecordMapper = FinancialRecordMapper;
class AttachmentMapper {
    toDTO(attachment) {
        const entity = attachment.toJSON();
        return entity;
    }
    toDTOs(attachments) {
        const _attachments = attachments.map((attachment) => {
            const entity = attachment.toJSON();
            return entity;
        });
        return _attachments;
    }
}
exports.AttachmentMapper = AttachmentMapper;
class UserMapper {
    toDTO(user) {
        const entity = user.toJSON();
        return entity;
    }
    toDTOs(users) {
        const _users = users.map((user) => {
            const entity = user.toJSON();
            return entity;
        });
        return _users;
    }
}
exports.UserMapper = UserMapper;
class IncomeTypeMapper {
    toDTO(incomeType) {
        const entity = incomeType.toJSON();
        return entity;
    }
    toDTOs(incomeTypes) {
        const _incomeTypes = incomeTypes.map((incomeType) => {
            const entity = incomeType.toJSON();
            return entity;
        });
        return _incomeTypes;
    }
}
exports.IncomeTypeMapper = IncomeTypeMapper;
class ExpenseTypeMapper {
    toDTO(expenseType) {
        const entity = expenseType.toJSON();
        return entity;
    }
    toDTOs(expenseTypes) {
        const _expenseTypes = expenseTypes.map((expenseType) => {
            const entity = expenseType.toJSON();
            return entity;
        });
        return _expenseTypes;
    }
}
exports.ExpenseTypeMapper = ExpenseTypeMapper;
class RecordTypeMapper {
    toDTO(recordType) {
        const entity = recordType.toJSON();
        return entity;
    }
    toDTOs(recordTypes) {
        const _recordTypes = recordTypes.map((recordType) => {
            const entity = recordType.toJSON();
            return entity;
        });
        return _recordTypes;
    }
}
exports.RecordTypeMapper = RecordTypeMapper;
class UserRoleMapper {
    toDTO(userRole) {
        const entity = userRole.toJSON();
        return entity;
    }
    toDTOs(userRoles) {
        const _userRoles = userRoles.map((userRole) => {
            const entity = userRole.toJSON();
            return entity;
        });
        return _userRoles;
    }
}
exports.UserRoleMapper = UserRoleMapper;
class BranchMapper {
    toDTO(branch) {
        const entity = branch.toJSON();
        return entity;
    }
    toDTOs(branches) {
        const _branches = branches.map((branch) => {
            const entity = branch.toJSON();
            return entity;
        });
        return _branches;
    }
}
exports.BranchMapper = BranchMapper;
class RoleMapper {
    toDTO(role) {
        const entity = role.toJSON();
        return entity;
    }
    toDTOs(roles) {
        const _roles = roles.map((role) => {
            const entity = role.toJSON();
            return entity;
        });
        return _roles;
    }
}
exports.RoleMapper = RoleMapper;
