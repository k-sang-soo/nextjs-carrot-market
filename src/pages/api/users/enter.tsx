import client from '@/libs/server/client';
import withHandler from '@/libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { phone, email } = req.body;
    const payload = phone ? { phone: +phone } : { email };
    const user = await client.user.upsert({
        where: {
            ...payload,
        },
        create: {
            name: 'Anonymous',
            ...payload,
        },
        update: {},
    });

    /*     if (email) {
        user = await client.user.findUnique({
            where: {
                email,
            },
        });
        if (user) console.log('찾음');
        if (!user) {
            console.log('못 찾음 새로 만들겠음');
            user = await client.user.create({
                data: {
                    name: 'Anonymous',
                    email,
                },
            });
        }
        console.log(user);
    }
    if (phone) {
        user = await client.user.findUnique({
            where: {
                phone: +phone,
            },
        });
        if (user) console.log('찾음');
        if (!user) {
            console.log('못 찾음 새로 만들겠음');
            user = await client.user.create({
                data: {
                    name: 'Anonymous',
                    phone: +phone,
                },
            });
        }
        console.log(user);
    } */

    return res.status(200).end();
}

export default withHandler('POST', handler);
