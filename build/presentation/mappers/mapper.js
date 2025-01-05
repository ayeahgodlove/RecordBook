"use strict";
// src/presentation/mappers/category-mapper.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleMapper = exports.BranchMapper = exports.UserRoleMapper = exports.UserMapper = exports.AttachmentMapper = exports.FinancialRecordMapper = exports.MeetingMinuteMapper = exports.AssetMapper = exports.CategoryMapper = void 0;
class CategoryMapper {
    toDTO(category) {
        const entity = category.toJSON();
        return entity;
    }
    toDTOs(categories) {
        const _categories = categories.map((category) => {
            const entity = category.toJSON();
            return entity;
        });
        return _categories;
    }
}
exports.CategoryMapper = CategoryMapper;
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
