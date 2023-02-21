import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr/_internal';
const fetcher = (url: string) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }: AppProps) {
    return (
        <SWRConfig value={{ fetcher }}>
            <div className="w-full max-w-xl mx-auto">
                <Component {...pageProps} />
            </div>
        </SWRConfig>
    );
}
