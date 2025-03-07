'use client';
import Image from 'next/image';
import {useEffect, useState} from 'react';

const Banner: React.FC = () => {
    const [url, setUrl] = useState<string>('');
    const custom_url_schema: string = "deeplink://";

    useEffect(() => {
        const getCookie = (name: string): string | undefined => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            return parts.length === 2 ? parts.pop()?.split(';').shift() : undefined;
        };

        const url_cookie = getCookie('url');

        if (url_cookie) {
            setUrl(url_cookie);
        }


        const timer = setTimeout(() => {
            if (navigator.userAgent.includes('Zalo') && url_cookie) {
                const fallbackUrl = get_url_fallback(url_cookie);
                if (fallbackUrl) {
                    window.location.href = fallbackUrl;
                }
            } else if (url) {
                window.location.href = url;
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [url]);

    const get_url_fallback = (url_cookie: string): string => {
        return url_cookie ? custom_url_schema + url_cookie.replace("https://", "") : "";
    };

    const addUrl = () => {
        const urlValue = (document.getElementById('id_text') as HTMLInputElement).value.trim();
        if (urlValue) {
            setUrl(urlValue);
            document.cookie = `url=${urlValue}; path=/;`;
        }
    };

    return (
        <div className="h-screen flex flex-col bg-white text-black">
            <div className="w-screen bg-white p-2 flex flex-row">
                <Image src="/img.png" alt="Image" width={40} height={40} className="w-12 h-12"/>
                <div className="flex flex-1 items-center ml-2">
                    <div className="flex flex-col flex-1">
                        <div className="font-bold">Con Cưng #1 Mẹ và Bé</div>
                        <div>Tã Sữa Khuyến Mãi</div>
                    </div>
                    <button
                        onClick={() => window.location.href = "https://apps.apple.com/vn/app/con-c%C6%B0ng-1-m%E1%BA%B9-v%C3%A0-b%C3%A9/id1442035575?l=vi"}
                        className="bg-pink-400 h-8 text-white px-2 rounded-md font-bold ml-auto text-xs"
                    >
                        INSTALL
                    </button>
                </div>
            </div>
            <div className="bg-pink-200 w-screen h-px"></div>
            <div className="flex-1 flex flex-col items-center justify-center mx-5">
                <div><strong>url_redirect:</strong> {url}</div>
                <div><strong>custom_url:</strong> {get_url_fallback(url)}</div>
                <div className="mt-5 flex flex-col items-center w-full">
                    <input
                        type="text"
                        id="id_text"
                        placeholder="Enter URL"
                        className="w-full border p-2 mb-4"
                    />
                    <button
                        onClick={addUrl}
                        className="w-24 bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Enter
                    </button>

                    {/*<button*/}
                    {/*    onClick={() => {*/}
                    {/*        window.location.href = "deeplink://reactPath?navigate_url=https://concung.com/sua-bot/spdd-cong-thuc-colosbaby-gold-d3k2-2-800g-s-69977.html";*/}
                    {/*    }}*/}
                    {/*    className="w-24 bg-blue-500 text-white px-4 py-2 rounded"*/}
                    {/*>*/}
                    {/*    Link 1*/}
                    {/*</button>*/}

                    {/*<button*/}
                    {/*    onClick={() => {*/}
                    {/*        //window.location.href = "deeplink://concung.com/bim-ta-khuyen-mai/ta-quan-merries-ultra-jumbo-xxl-32-mieng-64881.html";*/}
                    {/*        window.location.href = "shopeevn://reactPath?navigate_url=https%3A%2F%2Fshopee.vn%2F%3Fc%3Dfreeshipping%26pid%3Dmbb%26smtt%3D9%26utm_medium%3Dmobile%26utm_source%3Dbrowser&path=shopee%2FTRANSFER_PAGE&tab=buy&utm_medium=mobile&utm_source=browser";*/}
                    {/*    }}*/}
                    {/*    className="w-24 bg-blue-500 text-white px-4 py-2 rounded"*/}
                    {/*>*/}
                    {/*    Link 2*/}
                    {/*</button>*/}
                </div>
            </div>
        </div>
    );
};


export default Banner;