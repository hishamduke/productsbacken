import { InferSchemaType, Schema, model } from "mongoose";

const product = new Schema(
  {
    title: { type: String },
    description: { type: String },
    price: { type: Number },
    images: {
      type: [{ type: String }],
    },
    category: {
      type: String,
    },
  },
  { timestamps: true }
);
export const Productsp = model("product", product);

export type TProduct = InferSchemaType<typeof product> & { _id: string };
