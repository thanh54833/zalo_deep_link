'use client';
import Image from 'next/image';
import {useEffect, useState} from 'react';

const Banner: React.FC = () => {
    const [url, setUrl] = useState<string>('https://concung.com/sua-bot/spdd-c-thuc-icreo-learning-milk-820g-70077.html');

    const custom_url_schema: string = "deeplink://";

    useEffect(() => {
        const getCookie = (name: string): string | undefined => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop()?.split(';').shift();
        };

        const _url = getCookie('url');
        if (_url && _url.trim() !== '') {
            setUrl(_url);
        }

        if (navigator.userAgent.match(/(Zalo)/)) {
            window.location.href = get_url_fallback();// urlRedirectFallback;
        } else {
            // window.location.href = url;
        }

        const timer = setTimeout(() => {
            //window.location.href = get_url_fallback();
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    function get_url_fallback() {
        return custom_url_schema + url.replace("https://concung.com/", "")
    }

    const addUrl = () => {
        const urlValue = document.getElementById('id_text') as HTMLInputElement;
        if (urlValue) {
            setUrl(urlValue.value);
            document.cookie = `url=${urlValue.value}; path=/;`;
        }
    };

    return (
        <div className="h-screen flex flex-col bg-white flex-1 text-black bg-blue">
            <div className="w-screen bg-white p-[6px] flex flex-row">
                <Image src="/img.png" alt="Image" width={40} height={40} className="w-[50px] h-[50px]"/>
                <div className="flex flex-row flex-1 content-center items-center">
                    <div className="flex flex-col flex-1 ml-[10px]">
                        <div className="font-bold">
                            Con Cưng #1 Mẹ và Bé
                        </div>
                        <div>
                            Tã Sữa Khuyến Mãi
                        </div>
                    </div>
                    <div
                        onClick={() => {
                            window.location.href = "https://apps.apple.com/vn/app/con-c%C6%B0ng-1-m%E1%BA%B9-v%C3%A0-b%C3%A9/id1442035575?l=vi";
                        }}
                        className="bg-pink-400 h-[30px] text-white px-[10px] rounded-[15px] font-bold ml-auto align-middle text-[10px] items-center content-center"
                    >
                        INSTALL
                    </div>
                </div>
            </div>
            <div className={'h-full w-screen flex-1 flex flex-col items-center  justify-center ml-[5px] mr-[5px]'}>
                <div><strong>url_redirect:</strong> {url}</div>
                <div><strong>custom_url:</strong> {get_url_fallback()}</div>
                <div className={'mt-[20px] flex flex-col items-center'}>
                    <input
                        type="text"
                        id="id_text"
                        placeholder="Enter URL"
                        className="w-screen border p-2 mb-4 mr-[10px]"
                    />
                    <button
                        onClick={addUrl}
                        className="w-[100px] bg-blue-500 text-white px-4 py-2 rounded "
                    >
                        Enter
                    </button>
                </div>
            </div>


        </div>
    );
};

export default Banner;