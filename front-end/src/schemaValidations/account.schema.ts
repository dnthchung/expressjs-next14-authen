// Imports
import { Role } from "@/constants/type";
import z from "zod";

// ===================== Account Schemas =====================

// Thông tin tài khoản người dùng
export const AccountSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  role: z.enum([Role.Owner, Role.Employee]),
  avatar: z.string().nullable(),
});
export type AccountType = z.TypeOf<typeof AccountSchema>;

// Danh sách tài khoản trả về từ API
export const AccountListRes = z.object({
  data: z.array(AccountSchema),
  message: z.string(),
});
export type AccountListResType = z.TypeOf<typeof AccountListRes>;

// Kết quả trả về chi tiết một tài khoản
export const AccountRes = z
  .object({
    data: AccountSchema,
    message: z.string(),
  })
  .strict();
export type AccountResType = z.TypeOf<typeof AccountRes>;

// ===================== Employee Account Operations =====================

// Tạo tài khoản nhân viên
export const CreateEmployeeAccountBody = z
  .object({
    name: z.string().trim().min(2).max(256),
    email: z.string().email(),
    avatar: z.string().url().optional(),
    password: z.string().min(6).max(100),
    confirmPassword: z.string().min(6).max(100),
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu không khớp",
        path: ["confirmPassword"],
      });
    }
  });
export type CreateEmployeeAccountBodyType = z.TypeOf<typeof CreateEmployeeAccountBody>;

// Cập nhật tài khoản nhân viên
export const UpdateEmployeeAccountBody = z
  .object({
    name: z.string().trim().min(2).max(256),
    email: z.string().email(),
    avatar: z.string().url().optional(),
    changePassword: z.boolean().optional(),
    password: z.string().min(6).max(100).optional(),
    confirmPassword: z.string().min(6).max(100).optional(),
    role: z.enum([Role.Owner, Role.Employee]).optional().default(Role.Employee),
  })
  .strict()
  .superRefine(({ confirmPassword, password, changePassword }, ctx) => {
    if (changePassword && (!password || !confirmPassword)) {
      ctx.addIssue({
        code: "custom",
        message: "Hãy nhập mật khẩu mới và xác nhận mật khẩu mới",
        path: ["changePassword"],
      });
    } else if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu không khớp",
        path: ["confirmPassword"],
      });
    }
  });
export type UpdateEmployeeAccountBodyType = z.TypeOf<typeof UpdateEmployeeAccountBody>;

// Cập nhật thông tin cá nhân
export const UpdateMeBody = z
  .object({
    name: z.string().trim().min(2).max(256),
    avatar: z.string().url().optional(),
  })
  .strict();
export type UpdateMeBodyType = z.TypeOf<typeof UpdateMeBody>;

// Thay đổi mật khẩu
export const ChangePasswordBody = z
  .object({
    oldPassword: z.string().min(6).max(100),
    password: z.string().min(6).max(100),
    confirmPassword: z.string().min(6).max(100),
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu mới không khớp",
        path: ["confirmPassword"],
      });
    }
  });
export type ChangePasswordBodyType = z.TypeOf<typeof ChangePasswordBody>;

// ===================== Guest Schemas =====================

// Danh sách khách trả về từ API
export const GetListGuestsRes = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      tableNumber: z.number().nullable(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }),
  ),
  message: z.string(),
});
export type GetListGuestsResType = z.TypeOf<typeof GetListGuestsRes>;

// Thông tin khách khi tạo mới
export const CreateGuestRes = z.object({
  message: z.string(),
  data: z.object({
    id: z.number(),
    name: z.string(),
    role: z.enum([Role.Guest]),
    tableNumber: z.number().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
});
export type CreateGuestResType = z.TypeOf<typeof CreateGuestRes>;

// Tạo khách mới
export const CreateGuestBody = z
  .object({
    name: z.string().trim().min(2).max(256),
    tableNumber: z.number(),
  })
  .strict();
export type CreateGuestBodyType = z.TypeOf<typeof CreateGuestBody>;

// ===================== Query & Params =====================

// Tham số khi lấy danh sách khách
export const GetGuestListQueryParams = z.object({
  fromDate: z.coerce.date().optional(),
  toDate: z.coerce.date().optional(),
});
export type GetGuestListQueryParamsType = z.TypeOf<typeof GetGuestListQueryParams>;

// ID tài khoản trong URL
export const AccountIdParam = z.object({
  id: z.coerce.number(),
});
export type AccountIdParamType = z.TypeOf<typeof AccountIdParam>;
