// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../db/client';

interface Resp {
	success: 0 | 1;
	data?: string;
	error?: string;
}

interface Req {
	name: string;
	short: string;
	dsc: string;
	author: string;
	cake: string;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Resp>
) {
	if (req.method === "POST") {
		try {
			const body: Req = req.body;
			
			const data = await prisma.cake.findFirst({
				where : {
					name: {
						equals : body.name
					},
					author : {
						not : body.author
					}
				},
			})
	
			if (data) {
				res.status(403).send({
					success: 1,
					error: "Cake already exists, and you don't own it... So you can't update it!"
				})
				return
			}

			if (body.name.includes(" ")) {
				res.status(400).send({
					success: 1,
					error: "Name can't contain spaces"
				})
				return
			}

			if (body.name.length < 1) {
				res.status(400).send({
					success: 1,
					error: "Name is required"
				})
				return
			}

			await prisma.cake.upsert({
				where : {
					name : body.name
				},
				update : {
					lastUpdate : new Date(),
					...body
				},
				create : body
			})

			res.status(200).send({
				success: 0,
				data: "Cake updated!"
			})

			return


		} catch (e) {
			console.log(e)
			res.status(400).json({
				success: 1,
				error: JSON.stringify(e)
			});
			return;
		}


	} else {
		res.status(400).send({
			success: 1,
			error: "Invalid request method"
		})
	}
}
