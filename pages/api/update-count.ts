import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../db/client';

interface Resp {
    success  : 0 | 1;
    message? : string;
    error?   : string;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Resp>
) {

    return res.status(200).json({
        success: 0,
        message: "Hello World"
    })

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

        await prisma.cake.update({
            where: {
                name: name.toString()
            },
            data : {
                used: data!.used + 1
            }
        })
        
        res.status(200).send({
            success: 0,
            message: "Cake updated"
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