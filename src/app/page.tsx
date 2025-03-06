'use client';

import {useEffect} from "react";

export default function Home() {
    const url_redirect_fallback = "deeplink://sua-bot/spdd-c-thuc-icreo-learning-milk-820g-70077.html";
    const url_redirect = 'https://concung.com/sua-bot/spdd-c-thuc-icreo-learning-milk-820g-70077.html'

    useEffect(() => {
        if (navigator.userAgent.match(/(Zalo)/)) {
            window.location.href = url_redirect
        }
        const timer = setTimeout(() => {
            window.location.href = url_redirect_fallback
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            onClick={() => {
                window.location.href = url_redirect
            }}
            className={"w-[300px] h-[60px] bg-white rounded-[8px] text-black flex items-center justify-center font-bold"}>
            Redirect
        </div>
    );
}