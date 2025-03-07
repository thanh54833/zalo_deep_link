'use client';
import Image from 'next/image';
import {useEffect, useState} from 'react';

export default function Banner() {
    const [url, setUrl] = useState('');
    const url_redirect_fallback = "deeplink://sua-bot/spdd-c-thuc-icreo-learning-milk-820g-70077.html";
    const url_redirect = 'https://concung.com/sua-bot/spdd-c-thuc-icreo-learning-milk-820g-70077.html';

    useEffect(() => {
        if (navigator.userAgent.match(/(Zalo)/)) {
            window.location.href = url_redirect_fallback;
        } else {
            window.location.href = url_redirect;
        }
        const timer = setTimeout(() => {
            window.location.href = url_redirect_fallback;
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const addUrl = () => {
        setUrl(document.getElementById('id_text').value);
    };

    return (
        <div className="h-screen flex flex-col bg-white flex-1 text-black">
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
            {url}
            <div id="iframe" className="h-full w-full flex-1 flex flex-col items-center justify-center">
                <input
                    type="text"
                    id="id_text"
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter URL"
                    className="border p-2 mb-4 w-1/2"
                />
                <button
                    onClick={addUrl}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Enter
                </button>
            </div>
        </div>
    );
}