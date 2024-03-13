import { z } from "zod";

export const pageSchema = z.number().gte(1)