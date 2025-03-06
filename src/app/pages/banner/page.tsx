'use client';
import Image from 'next/image';

export default function Banner() {
    return (
        <div className="h-screen flex flex-col bg-white flex-1">
            <div className="w-screen bg-white p-[6px] flex flex-row">
                <Image src="/img.png" alt="Image" width={40} height={40} className="w-[50px] h-[50px]" />
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
            <div id="iframe" className="h-full w-full flex-1">
                <iframe
                    src="http://10.10.11.88:3000/sua-bot_spdd-c-thuc-icreo-learning-milk-820g-70077.html"
                    className="w-full h-full"
                    frameBorder="0"
                />
            </div>
        </div>
    );
}