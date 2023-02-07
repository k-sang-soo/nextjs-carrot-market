import client from '@/libs/server/client';
import withHandler, { ResponseType } from '@/libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>,
) {
    const { phone, email } = req.body;
    const user = phone ? { phone: +phone } : email ? { email } : null;
    if (!user) return res.status(400).json({ ok: false });
    const payload = Math.floor(10000 + Math.random() * 900000) + '';
    const token = await client.token.create({
        data: {
            payload,
            user: {
                connectOrCreate: {
                    where: {
                        ...user,
                    },
                    create: {
                        name: 'Anonymous',
                        ...user,
                    },
                },
            },
        },
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
    if (phone) {
        const msg = await twilioClient.messages.create({
            messagingServiceSid: process.env.TWILIO_MSID,
            // 원래는 아래 코드가 들어가야겠지만 테스트 계정이니 생략
            // to: phone
            to: process.env.MY_PHONE!,
            body: `your login token is ${payload}.`,
        });
        console.log(msg);
    }

    return res.status(200).json({
        ok: true,
    });
}

export default withHandler('POST', handler);
