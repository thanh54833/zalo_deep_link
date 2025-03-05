'use client';

import {useEffect} from 'react';

export default function Home() {

    const url_redirect = 'https://concung.com/sua-bot/spdd-c-thuc-icreo-learning-milk-820g-70077.html';
    useEffect(() => {
        const timer = setTimeout(() => {
            window.location.href = url_redirect;
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <div
                    onClick={() => {
                        window.location.href = url_redirect;
                    }}
                    className={"w-[300px] h-[60px] bg-white rounded-[8px] text-black flex items-center justify-center font-bold"}>
                    Redirect
                </div>
            </main>
        </div>
    );
}