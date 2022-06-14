// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../db/client';

interface Resp {
	success: 0 | 1;
	data?: {
        length : number;
        cakes : Array<{
            name : string;
            short : string;
            dsc : string;
            author : string;
            cake : string;
        }>
    };
	error?: string;
}

export default async function handler(
    req: NextApiRequest,
	res: NextApiResponse<Resp>
) {

    try {

        const { name } = req.query;
        if (typeof name !== "string") {
            res.status(400).send({
                success: 1,
                error: "Invalid query"
            })
            return
        }

        const data = await prisma.cake.findMany({
            where : {
                name: {
                    contains: name
                }
            }
        })

        res.status(200).send({
            success: 0,
            data: {
                length: data.length,
                cakes: data
            }
        })

    } catch (e) {
        console.log(e)
        res.status(400).send({
            success: 1,
            error: "Invalid query"
        })
    }

}