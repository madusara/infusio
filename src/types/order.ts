import { z } from "zod";
import { OrderSchema } from "./schema";

export type Order = z.infer<typeof OrderSchema>;