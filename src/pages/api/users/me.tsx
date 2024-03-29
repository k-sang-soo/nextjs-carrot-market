import client from '@/libs/server/client';
import withHandler, { ResponseType } from '@/libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import { withApiSesstion } from './../../../libs/server/withSession';

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
    res.json({
        ok: true,
        profile,
    });
}

export default withApiSesstion(
    withHandler({
        methods: ['GET'],
        handler,
    }),
);
