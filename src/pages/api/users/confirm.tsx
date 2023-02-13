import { withIronSessionApiRoute } from 'iron-session/next';
import client from '@/libs/server/client';
import withHandler, { ResponseType } from '@/libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';

declare module 'iron-session' {
    interface IronSessionData {
        user?: {
            id: number;
        };
    }
}

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>,
) {
    const { token } = req.body;
    console.log(token);
    const exists = await client.token.findUnique({
        where: {
            payload: token,
        },
        // include: { user: true} 유저 정보 가져오기
    });
    if (!exists) return res.status(404).end();
    req.session.user = {
        id: exists?.userId,
    };
    await req.session.save();
    console.log('exists', exists);
    return res.status(200).end();
}

export default withIronSessionApiRoute(withHandler('POST', handler), {
    cookieName: 'carrotsession',
    password: 'dsfjmkbgnkdjfn1209ui39012jeojkasnfjoasnfkasmfl',
});
