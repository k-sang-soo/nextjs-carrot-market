import client from '@/libs/server/client';
import withHandler, { ResponseType } from '@/libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import { withApiSesstion } from './../../../libs/server/withSession';

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>,
) {
    const {
        body: { name, price, description },
        session: { user },
    } = req;
    const product = await client.product.create({
        data: {
            name,
            price: +price,
            description,
            image: 'xx',
            user: {
                connect: {
                    id: user?.id,
                },
            },
        },
    });
    res.json({
        ok: true,
        product,
    });
}

export default withApiSesstion(
    withHandler({
        method: 'POST',
        handler,
    }),
);
