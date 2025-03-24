'use client';
import Image from 'next/image';
import {useEffect, useState} from 'react';

const Banner: React.FC = () => {

    const [url, setUrl] = useState('');


    useEffect(() => {
        //window.location.href = primaryUrl;

        const concungUrl = window.location.href;//"https://concung.com/sua-tuoi-cac-loai/sua-tuoi-tiet-trung-co-duong-vinamilk-180ml-loc-4-hop-44928.html";
        const customUrl = "deeplink://" + concungUrl.replace("https://", ""); // deeplink://concung.com/sua-tuoi-cac-loai/sua-tuoi-tiet-trung-co-duong-vinamilk-180ml-loc-4-hop-44928.html

        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const isZalo = navigator.userAgent.includes('Zalo');

        if (isMobile && isZalo) {
            const time = setTimeout(() => {
                window.location.href = customUrl;
            }, 200);
            return () => clearTimeout(time);
        }

    }, []);


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
            <div className="flex-1 flex flex-col items-center justify-center mx-5 bg-blue-200">
                {url}
                {navigator.userAgent}
            </div>
        </div>
    );
};

export default Banner;