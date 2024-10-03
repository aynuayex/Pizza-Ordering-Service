import { z } from "zod";

export const addOrderSchema = z.object({
  name: z
    .string()
    .min(2, { message: "book Name must be at least 2 characters." }),
  // author: z.string().min(2, { message: "author Name must be at least 2 characters."}),
  // category: z.enum(["FICTION", "SELF_HELP", "BUSINESS"], {
  //     required_error: "Please select category of the book.",
  // }),
  // quantity: z.coerce.number({
  //     required_error: "quantity is required",
  //     invalid_type_error: "quantity must be a number"
  //         }).min(1, "quantity must be greater than 1."),

  price: z.coerce
    .number({
      required_error: "price is required",
      invalid_type_error: "price must be a number",
    })
    .min(5, "price must be greater than 5."),
    
    toppings: z.array(
      z.object({
        name: z.string(),
        checked: z.boolean(),
      })
    ),
  // mozzarella: z.boolean(),
  // tomato: z.boolean(),
  // bell_peppers: z.boolean(),
  // onions: z.boolean(),
  // olives: z.boolean(),
});

export type AddOrderSchema = z.infer<typeof addOrderSchema>;
