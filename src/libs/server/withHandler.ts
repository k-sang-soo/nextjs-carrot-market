import { NextApiRequest, NextApiResponse } from 'next';

export interface ResponseType {
    ok: boolean;
    [key: string]: any;
}

interface ConfigType {
    method: 'GET' | 'POST' | 'DELETE';
    handler: (req: NextApiRequest, res: NextApiResponse) => void;
    isPrivate?: boolean;
}

//고차함수
export default function withHandler({
    method,
    handler,
    isPrivate = true,
}: ConfigType) {
    return async function (req: NextApiRequest, res: NextApiResponse) {
        if (req.method !== method) {
            return res.status(405).end();
        }
        if (isPrivate && !req.session.user) {
            return res.status(401).json({ ok: false, error: 'Plz log in.' });
        }
        try {
            await handler(req, res);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    };
}
