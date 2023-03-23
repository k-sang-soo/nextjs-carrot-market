import { NextApiRequest, NextApiResponse } from 'next';
import { withApiSesstion } from './../../../libs/server/withSession';
import withHandler, { ResponseType } from '@/libs/server/withHandler';
import client from '@/libs/server/client';

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>,
) {
    const { id } = req.query as { id: string | string[] };
    const product = await client.product.findUnique({
        where: {
            id: +id?.toString(),
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    avater: true,
                },
            },
        },
    });
    res.json({ ok: true, product });
}

export default withApiSesstion(
    withHandler({
        methods: ['GET'],
        handler,
    }),
);
