"use client";
import {useEffect, useState} from 'react';
import Cookies from 'js-cookie';

enum Model {
    YOLOV11N = 'yolo11n',
    YOLOV11S = 'yolo11s',
    YOLOV11M = 'yolo11m',
    YOLOV11L = 'yolo11l',
    YOLOV11X = 'yolo11x',
}

export default function ObjectDetect() {
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [model, setModel] = useState<Model>(Object.values(Model)[0]);

    const [results, setResults] = useState<Array<{
        label: string,
        score: number,
        image: string,
        duration: string,
        box: [number, number, number, number]
    }>>([]);

    const [error, setError] = useState<string | null>(null);
    const [requestTime, setRequestTime] = useState<number | null>(null);
    const [excludeLabel, setExcludeLabel] = useState<string>(Cookies.get('excludeLabel') || 'person,refrigerator,');

    useEffect(() => {
        Cookies.set('excludeLabel', excludeLabel);
    }, [excludeLabel]);

    useEffect(() => {
        if (capturedImage) {
            const file = dataURLtoFile(capturedImage, 'capturedImage.png');
            sendImageToAPI(file);
        }
    }, [model]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageData = reader.result as string;
                setCapturedImage(imageData);
                sendImageToAPI(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const sendImageToAPI = async (file: File) => {
        setError(null);
        setRequestTime(null);
        const formData = new FormData();
        formData.append('file', file);
        const startTime = performance.now();

        try {
            const response = await fetch(`http://10.10.11.162:8000/yolo/detect-and-crop?excludes=${excludeLabel}&model=${model}`, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                },
                body: formData,
            });
            const result = await response.json();
            setResults(result); // Assuming the API returns an array of objects
        } catch (error) {
            console.error('Error sending image to API:', error);
            setError('Failed to process the image. Please try again.');
        } finally {
            const endTime = performance.now();
            setRequestTime(endTime - startTime);
        }
    };

    const handleSaveClick = () => {
        Cookies.set('excludeLabel', excludeLabel);
    };

    const dataURLtoFile = (dataurl: string, filename: string) => {
        const arr = dataurl.split(',');
        const mime = arr[0].match(/:(.*?);/)?.[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type: mime});
    };

    return (
        <div className="h-screen w-screen flex flex-col items-center p-[5px] bg-blue-400">
            <div className="flex flex-row ">
                {
                    Object.values(Model).map((value, index) => (
                        <div key={index}
                             onClick={() => setModel(value)}
                             className={`m-2 px-[8px] rounded-[8px] font-bold ${model === value ? 'bg-blue-700' : 'text-[15px]'}`}>{value}</div>
                    ))
                }
            </div>
            <div className={"h-[250px] mb-4"}>

                {capturedImage && (
                    <div style={{position: 'relative', display: 'inline-block'}}>
                        <img
                            src={capturedImage}
                            alt="Captured"
                            className="border border-gray-300 rounded rotate-0"
                            style={{height: '250px'}}
                        />

                        {results[0] && results[0].box && (
                            <div style={{
                                position: 'absolute',
                                border: '2px solid rgba(255, 0, 0, 0.8)', // Red border with some transparency
                                backgroundColor: 'rgba(255, 0, 0, 0.2)', // Light red background for focus
                                left: `${results[0].box[0]}px`,
                                top: `${results[0].box[1]}px`,
                                width: `${results[0].box[2] - results[0].box[0]}px`,
                                height: `${results[0].box[3] - results[0].box[1]}px`,
                                pointerEvents: 'none', // Prevent interaction with the box
                                boxShadow: 'none', // Remove shadow to keep it inside the image
                                transition: 'all 0.3s ease', // Smooth transition for hover effects
                                zIndex: 1, // Ensure the box is above the image
                            }}/>
                        )}
                    </div>
                )}
            </div>
            <div className={"w-screen font-bold"}><p>Excludes:</p></div>
            <div className={"w-screen flex flex-row mb-[4px] "}>
                <input
                    type="text"
                    value={excludeLabel}
                    onChange={(e) => setExcludeLabel(e.target.value)}
                    className="w-screen rounded-[10px] p-2 text-black bg-white"
                    placeholder="Exclude Label"
                />
                <div
                    className={"w-[150px] bg-blue-700 ml-[10px] font-bold justify-center items-center flex flex-col rounded-[5px] px-[10px]"}
                    onClick={handleSaveClick}
                >
                    Save
                </div>
            </div>

            <input type="file" accept="image/*" onChange={handleFileChange}
                   className="w-screen mx-5 mb-4 rounded-[10px] p-2 text-white bg-blue-700" title="Choose File"/>

            {results.length > 0 && (
                <div>
                    <h3 className="text-lg font-bold mb-2 flex flex-row">
                        Results: {requestTime !== null ? `${results[0].duration} ms` : ''}
                    </h3>
                    <div className="flex flex-row flex-wrap">
                        {results.map((result, index) => (
                            <div key={index} className="m-[2px]">
                                <div className={"text-[10px]"}>{result.label} {result.score}</div>
                                <img src={`data:image/png;base64,${result.image}`} alt="Result"
                                     className="border border-gray-300 rounded w-[120px] rotate-0"/>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {error && (
                <div className="text-red-500">
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
}