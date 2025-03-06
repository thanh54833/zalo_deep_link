import Image from 'next/image';

export default function Banner() {
    return (
        <div className="h-screen flex flex-col bg-white flex-1">
            <div className="h-[50px] w-[50px] bg-white p-[6px] flex flex-row">
                <Image src="/img.png" alt="Image" width={50} height={50}/>
                <div className={"flex flex-row flex-1 items-center content-center justify-end"}>
                    <div className={"bg-pink-50 text-white items-center justify-end"}>Install</div>
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