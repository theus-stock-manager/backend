import * as yup from "yup";
import { IRecoverPasswordRequest, IUserRequest } from "../types/user";

export const createUserSchema: yup.SchemaOf<IUserRequest> = yup.object().shape({
  name: yup.string().required("name: campo obrigatório.").min(4),

  password: yup
    .string()
    .required("password: campo obrigatório")
    .max(50)
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "password: a senha deve conter ao menos uma letra maiúscula, uma minúscula, um caractere especial, um número e no mínimo 8 dígitos"
    ),

  isAdm: yup.boolean().optional(),

  securityAsk: yup
    .string()
    .required("securityAsk: campo obrigatório")
    .min(1)
    .max(150),

  securityAnswer: yup
    .string()
    .required("securityAnswer: campo obrigatório")
    .min(1)
    .max(100),

  companyId: yup.string().required("companyId: campo obrigatório"),
});

export const updateUserSchema: yup.SchemaOf<IUserRequest> = yup.object().shape({
  name: yup.string().optional().min(4),

  password: yup
    .string()
    .optional()
    .max(50)
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "password: a senha deve conter ao menos uma letra maiúscula, uma minúscula, um caractere especial, um número e no mínimo 8 dígitos"
    ),

  isAdm: yup.boolean().optional(),

  securityAsk: yup.string().optional().min(1).max(150),

  securityAnswer: yup.string().optional().min(1).max(100),

  companyId: yup.string().optional(),
});

export const recoverPasswordSchema: yup.SchemaOf<IRecoverPasswordRequest> = yup
  .object()
  .shape({
    securityAnswer: yup
      .string()
      .required("securityAnswer: Campo obrigatório")
      .min(0),

    newPassword: yup
      .string()
      .required("newPassword: Campo obrigatório")
      .max(50)
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "password: a senha deve conter ao menos uma letra maiúscula, uma minúscula, um caractere especial, um número e no mínimo 8 dígitos"
      ),
  });
