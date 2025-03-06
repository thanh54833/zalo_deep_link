'use client';

import {useEffect} from "react";

export default function Home() {
    const url_redirect = "deeplink://test"
    // 'https://concung.com/sua-bot/spdd-c-thuc-icreo-learning-milk-820g-70077.html'
    // 'http://app.appsflyer.com/com.shopee.vn?deep_link=reactPath%3Fnavigate_url%3Dhttps%253A%252F%252Fshopee.vn%252F%253Fc%253D1111salekhungnhatnam%2526pid%253Dmbb%2526referer%253DaHR0cHM6Ly9zaG9wZWUudm4vcHJvZHVjdC85NzU4NjU5MzIvMjA1Nzc3OTgxOTI%25252FZF9pZD1mODliOCZ1bHNfdHJhY2tpZD01MTRxbjlwdTAwbDQmdXRtX2NvbnRlbnQ9dXI0VTgyTjM4dm1qWHdpZWVRaHJ4Z2p5VkVY%2526smtt%253D9%2526user_agent%253DTW96aWxsYS81LjAgKExpbnV4OyBBbmRyb2lkIDEwOyBLKSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvMTI5LjAuMC4wIE1vYmlsZSBTYWZhcmkvNTM3LjM2%2526utm_medium%253Dmobile%2526utm_source%253Dbrowser%26path%3Dshopee%252FTRANSFER_PAGE%26tab%3Dbuy%26utm_medium%3Dmobile%26utm_source%3Dbrowser&smtt=9&utm_medium=mobile&utm_source=browser&af_sub1=cmVhY3RQYXRoP25hdmlnYXRlX3VybD1odHRwcyUzQSUyRiUyRnNob3BlZS52biUyRiUzRmMlM0QxMTExc2FsZWtodW5nbmhhdG5hbSUyNnBpZCUzRG1iYiUyNnJlZmVyZXIlM0RhSFIwY0hNNkx5OXphRzl3WldVdWRtNHZjSEp2WkhWamRDODVOelU0TmpVNU16SXZNakExTnpjM09UZ3hPVEklMjUyRlpGOXBaRDFtT0RsaU9DWjFiSE5mZEhKaFkydHBaRDAxTVRSeGJqbHdkVEF3YkRRbWRYUnRYMk52Ym5SbGJuUTlkWEkwVlRneVRqTTRkbTFxV0hkcFpXVlJhSEo0WjJwNVZrVlklMjZzbXR0JTNEOSUyNnVzZXJfYWdlbnQlM0RUVzk2YVd4c1lTODFMakFnS0V4cGJuVjRPeUJCYm1SeWIybGtJREV3T3lCTEtTQkJjSEJzWlZkbFlrdHBkQzgxTXpjdU16WWdLRXRJVkUxTUxDQnNhV3RsSUVkbFkydHZLU0JEYUhKdmJXVXZNVEk1TGpBdU1DNHdJRTF2WW1sc1pTQlRZV1poY21rdk5UTTNMak0yJTI2dXRtX21lZGl1bSUzRG1vYmlsZSUyNnV0bV9zb3VyY2UlM0Ricm93c2VyJnZlcnNpb249MSZwYXRoPXNob3BlZSUyRlRSQU5TRkVSX1BBR0UmdGFiPWJ1eSZ1dG1fbWVkaXVtPW1vYmlsZSZ1dG1fc291cmNlPWJyb3dzZXI%3D&c=1111salekhungnhatnam&pid=mbb&referrer=af_tranid%3Dzj5v_nZDeiWnKXALqNNbeA%26af_android_url%3Dhttps%3A%2F%2Fshopee.vn%2Fapp%3Fdeep_link%3DreactPath%253Fnavigate_url%253Dhttps%25253A%25252F%25252Fshopee.vn%25252F%25253Fc%25253D1111salekhungnhatnam%252526pid%25253Dmbb%252526referer%25253DaHR0cHM6Ly9zaG9wZWUudm4vcHJvZHVjdC85NzU4NjU5MzIvMjA1Nzc3OTgxOTI%2525252FZF9pZD1mODliOCZ1bHNfdHJhY2tpZD01MTRxbjlwdTAwbDQmdXRtX2NvbnRlbnQ9dXI0VTgyTjM4dm1qWHdpZWVRaHJ4Z2p5VkVY%252526smtt%25253D9%252526user_agent%25253DTW96aWxsYS81LjAgKExpbnV4OyBBbmRyb2lkIDEwOyBLKSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvMTI5LjAuMC4wIE1vYmlsZSBTYWZhcmkvNTM3LjM2%252526utm_medium%25253Dmobile%252526utm_source%25253Dbrowser%2526path%253Dshopee%25252FTRANSFER_PAGE%2526tab%253Dbuy%2526utm_medium%253Dmobile%2526utm_source%253Dbrowser%26fallback_to_store%3D1%26smtt%3D9%26utm_medium%3Dmobile%26utm_source%3Dbrowser%26af_sub1%3DcmVhY3RQYXRoP25hdmlnYXRlX3VybD1odHRwcyUzQSUyRiUyRnNob3BlZS52biUyRiUzRmMlM0QxMTExc2FsZWtodW5nbmhhdG5hbSUyNnBpZCUzRG1iYiUyNnJlZmVyZXIlM0RhSFIwY0hNNkx5OXphRzl3WldVdWRtNHZjSEp2WkhWamRDODVOelU0TmpVNU16SXZNakExTnpjM09UZ3hPVEklMjUyRlpGOXBaRDFtT0RsaU9DWjFiSE5mZEhKaFkydHBaRDAxTVRSeGJqbHdkVEF3YkRRbWRYUnRYMk52Ym5SbGJuUTlkWEkwVlRneVRqTTRkbTFxV0hkcFpXVlJhSEo0WjJwNVZrVlklMjZzbXR0JTNEOSUyNnVzZXJfYWdlbnQlM0RUVzk2YVd4c1lTODFMakFnS0V4cGJuVjRPeUJCYm1SeWIybGtJREV3T3lCTEtTQkJjSEJzWlZkbFlrdHBkQzgxTXpjdU16WWdLRXRJVkUxTUxDQnNhV3RsSUVkbFkydHZLU0JEYUhKdmJXVXZNVEk1TGpBdU1DNHdJRTF2WW1sc1pTQlRZV1poY21rdk5UTTNMak0yJTI2dXRtX21lZGl1bSUzRG1vYmlsZSUyNnV0bV9zb3VyY2UlM0Ricm93c2VyJnZlcnNpb249MSZwYXRoPXNob3BlZSUyRlRSQU5TRkVSX1BBR0UmdGFiPWJ1eSZ1dG1fbWVkaXVtPW1vYmlsZSZ1dG1fc291cmNlPWJyb3dzZXI%253D%26c%3D1111salekhungnhatnam%26pid%3Dmbb'

    useEffect(() => {
        const timer = setTimeout(() => {
            // Open the URL in a new tab
            // window.open(url_redirect, '_blank');
            if (navigator.userAgent.match(/(Zalo)/)) {
                window.location.href = url_redirect
            }
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black"
        >
            <head>
                <meta name="apple-itunes-app" content="app-id=1442035575"/>
                <meta name="google-play-app" content="app-id=com.example.android"/>
            </head>
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

                {navigator.userAgent}
                <div
                    id={"redirect_id"}
                    onClick={() => {
                        //window.location.assign(url_redirect);
                        window.location.href = url_redirect
                    }}
                    className={"w-[300px] h-[60px] bg-white rounded-[8px] text-black flex items-center justify-center font-bold"}>
                    Redirect
                </div>
            </main>
        </div>
    );
}