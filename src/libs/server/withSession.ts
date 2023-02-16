import { withIronSessionApiRoute } from 'iron-session/next';

declare module 'iron-session' {
    interface IronSessionData {
        user?: {
            id: number;
        };
    }
}

const cookieOptions = {
    cookieName: 'carrotsession',
    password: process.env.COOKIE_PASSWORD!,
};

export function withApiSesstion(fn: any) {
    return withIronSessionApiRoute(fn, cookieOptions);
}
