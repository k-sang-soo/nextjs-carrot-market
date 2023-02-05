import { NextApiRequest, NextApiResponse } from 'next';
export default function withHandler(
    method: 'GET' | 'POST' | 'DELETE',
    fn: (req: NextApiRequest, res: NextApiResponse) => void,
) {
    return async function (req: NextApiRequest, res: NextApiResponse) {
        res.json({ hello: true });
    };
}
