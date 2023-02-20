import client from '@/libs/server/client';
import withHandler, { ResponseType } from '@/libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import { withApiSesstion } from './../../../libs/server/withSession';

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>,
) {
    const { token } = req.body;
    console.log(token);
    const foundToken = await client.token.findUnique({
        where: {
            payload: token,
        },
        // include: { user: true} 유저 정보 가져오기
    });
    if (!foundToken) return res.status(404).end();
    req.session.user = {
        id: foundToken?.userId,
    };
    await req.session.save();
    await client.token.deleteMany({
        where: {
            userId: foundToken.userId,
        },
    });
    res.json({ ok: true });
}

export default withApiSesstion(
    withHandler({
        method: 'POST',
        handler,
        isPrivate: false,
    }),
);
