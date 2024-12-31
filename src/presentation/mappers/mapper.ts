// src/presentation/mappers/category-mapper.ts

import { Branch } from "../../data/entities/branch";
import { Category } from "../../data/entities/category";
import { Role } from "../../data/entities/role";
import { User } from "../../data/entities/user";
import { IBranch } from "../../domain/models/branch";
import { ICategory } from "../../domain/models/category";
import { IRole } from "../../domain/models/role";
import { IUser } from "../../domain/models/user";
import { UserRole } from "../../data/entities/user-role";
import { IUserRole } from "../../domain/models/user-role";
import { Asset } from "../../data/entities/asset";
import { IAsset } from "../../domain/models/asset";
import { MeetingMinute } from "../../data/entities/meeting-minute";
import { IMeetingMinute } from "../../domain/models/meeting-minute";
import { FinancialRecord } from "../../data/entities/financial-record";
import { IFinancialRecord } from "../../domain/models/financial-record";
import { Attachment } from "../../data/entities/attachment";
import { IAttachment } from "../../domain/models/attachment";

export class CategoryMapper {
  toDTO(category: Category): ICategory {
    const entity = category.toJSON<ICategory>();
    return entity;
  }
  toDTOs(categories: Category[]): ICategory[] {
    const _categories = categories.map((category) => {
      const entity = category.toJSON<ICategory>();
      return entity;
    });
    return _categories;
  }
}

export class AssetMapper {
  toDTO(asset: Asset): IAsset {
    const entity = asset.toJSON<IAsset>();
    return entity;
  }
  toDTOs(assets: Asset[]): IAsset[] {
    const _assets = assets.map((asset) => {
      const entity = asset.toJSON<IAsset>();
      return entity;
    });
    return _assets;
  }
}

export class MeetingMinuteMapper {
  toDTO(meetingMinute: MeetingMinute): IMeetingMinute {
    const entity = meetingMinute.toJSON<IMeetingMinute>();
    return entity;
  }
  toDTOs(meetingMinutes: MeetingMinute[]): IMeetingMinute[] {
    const _meetingMinutes = meetingMinutes.map((meetingMinute) => {
      const entity = meetingMinute.toJSON<IMeetingMinute>();
      return entity;
    });
    return _meetingMinutes;
  }
}

export class FinancialRecordMapper {
  toDTO(financialRecord: FinancialRecord): IFinancialRecord {
    const entity = financialRecord.toJSON<IFinancialRecord>();
    return entity;
  }
  toDTOs(financialRecords: FinancialRecord[]): IFinancialRecord[] {
    const _financialRecords = financialRecords.map((financialRecord) => {
      const entity = financialRecord.toJSON<IFinancialRecord>();
      return entity;
    });
    return _financialRecords;
  }
}

export class AttachmentMapper {
  toDTO(attachment: Attachment): IAttachment {
    const entity = attachment.toJSON<IAttachment>();
    return entity;
  }
  toDTOs(attachments: Attachment[]): IAttachment[] {
    const _attachments = attachments.map((attachment) => {
      const entity = attachment.toJSON<IAttachment>();
      return entity;
    });
    return _attachments;
  }
}

export class UserMapper {
  toDTO(user: User): IUser {
    const entity = user.toJSON<IUser>();
    return entity;
  }
  toDTOs(users: User[]): IUser[] {
    const _users = users.map((user) => {
      const entity = user.toJSON<IUser>();
      return entity;
    });
    return _users;
  }
}

export class UserRoleMapper {
  toDTO(userRole: UserRole): IUserRole {
    const entity = userRole.toJSON<IUserRole>();
    return entity;
  }
  toDTOs(userRoles: UserRole[]): IUserRole[] {
    const _userRoles = userRoles.map((userRole) => {
      const entity = userRole.toJSON<IUserRole>();
      return entity;
    });
    return _userRoles;
  }
}


export class BranchMapper {
  toDTO(branch: Branch): IBranch {
    const entity = branch.toJSON<IBranch>();
    return entity;
  }
  toDTOs(branches: Branch[]): IBranch[] {
    const _branches = branches.map((branch) => {
      const entity = branch.toJSON<IBranch>();
      return entity;
    });
    return _branches;
  }
}


export class RoleMapper {
  toDTO(role: Role): IRole {
    const entity = role.toJSON<IRole>();
    return entity;
  }
  toDTOs(roles: Role[]): IRole[] {
    const _roles = roles.map((role) => {
      const entity = role.toJSON<IRole>();
      return entity;
    });
    return _roles;
  }
}