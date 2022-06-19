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

			const resp = await fetch(
				`https://api.github.com/user`,
				{
					headers : {
						"Authorization": `token ${body.author}`
					}
				}
			)
			const j = await resp.json();

			if (j.login) {
				const data = await prisma.cake.findFirst({
					where : {
						name: {
							equals : body.name
						},
						author : {
							not : j.login
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
						name: body.name,
						short: body.short,
						dsc: body.dsc,
						author: j.login,
						cake: body.cake,
					},
					create : {
						name: body.name,
						short: body.short,
						dsc: body.dsc,
						author: j.login,
						cake: body.cake,
					}
				})
	
				res.status(200).send({
					success: 0,
					data: "Cake updated!"
				})
	
				return
			} else {
				res.status(400).json({
					success: 1,
					error: "Invalid token. This is probably because of the change in the api so please update the cli"
				})
				return
			}


		} catch (e) {
			console.log(e)
			res.status(400).json({
				success: 1,
				error: (`${e}`)
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

