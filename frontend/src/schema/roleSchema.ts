import { z } from "zod";

export const roleSchema = z.object({
  roleName: z
    .string()
    .min(3, { message: "Role Name must be at least 3 characters." }),
  permissions: z.array(
    z.object({
      label: z
        .string()
        .min(3, { message: "Label must be at least 3 characters." }),
      permission: z.array(
        z.object({
          action: z
            .string()
            .min(3, { message: "Action must be at least 3 characters." }),
          subject: z
            .string()
            .min(3, { message: "Subject must be at least 3 characters." }),
        })
      ),
      checked: z.boolean(),
    })
  ),

  // mozzarella: z.boolean(),
  // tomato: z.boolean(),
  // bell_peppers: z.boolean(),
  // onions: z.boolean(),
  // olives: z.boolean(),
});

export type RoleSchema = z.infer<typeof roleSchema>;
