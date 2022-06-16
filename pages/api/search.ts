import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../db/client';

interface Resp {
    success: 0 | 1;
    data?: Array<{
        name : string;
        short : string;
        dsc : string;
        author : string;
        cake : string;
    }>;
    error?: string;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Resp>
) {

    try {

        const { name, page, limit } = req.query;
        if (typeof name !== "string" || typeof page !== "string" || typeof limit !== "string") {
            res.status(400).send({
                success: 1,
                error: "Invalid query"
            })
            return
        }

        const data = await prisma.cake.findMany({
            where : {
                name : {
                    contains: name
                }
            },
            skip: parseInt(page) * parseInt(limit),
            take: parseInt(limit)
        })

        if (data === null) {
            res.status(404).send({
                success: 1,
                error: "Cake not found"
            })
            return
        }

        res.status(200).send({
            success: 0,
            data: data
        })

    } catch (e) {
        console.log(e)
        res.status(400).send({
            success: 1,
            error: "Invalid query"
        })
        return
    }

}