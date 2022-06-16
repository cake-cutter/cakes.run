import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../db/client';

interface Resp {
    success: 0 | 1;
    data?: {
        name : string;
        short : string;
        dsc : string;
        author : string;
        cake : string;
        lastUpdate: Date;
        used: number;
    };
    error?: string;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Resp>
) {

    try {
        
        const { name } = req.query;

        const data = await prisma.cake.findFirst({
            where : {
                name: name.toString()
            }
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