import { agents } from "@/database/Schema";
import { createTRPCRouter, baseProcedure } from "@/trpc/init";
import { db } from "@/database";
import { resolve } from "path";
import { TRPCError } from "@trpc/server";

export const agentsRouter = createTRPCRouter({
    getMany: baseProcedure.query(async()=>{
        const data = await db
        .select()
        .from(agents);

        return data
    })
})