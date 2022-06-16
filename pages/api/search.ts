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

        const data = await prisma.cake.findMany({
            where : {
                name : {
                    contains: name.toString()
                }
            },
            skip: parseInt(page.toString()) * parseInt(limit.toString()),
            take: parseInt(limit.toString())
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
            error: (`${e}`)
        })
        return
    }

}