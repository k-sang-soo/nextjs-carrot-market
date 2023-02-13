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
    console.log(req.session.user);
    const profile = await client.user.findUnique({
        where: {
            id: req.session.user?.id,
        },
    });
    return res.json({
        ok: true,
        profile,
    });
}

export default withIronSessionApiRoute(withHandler('GET', handler), {
    cookieName: 'carrotsession',
    password: 'dsfjmkbgnkdjfn1209ui39012jeojkasnfjoasnfkasmfl',
});
