"use client";
import {useEffect, useState} from 'react';
import Cookies from 'js-cookie';

enum Model {
    YOLOV11N = 'yolo11n',
    YOLOV11X = 'yolo11n_pretrained',
}

export default function ObjectDetect() {
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [model, setModel] = useState<Model>(Cookies.get('model') as Model || Model.YOLOV11N);
    const [results, setResults] = useState<Array<{
        label: string,
        score: number,
        image: string,
        duration: string
    }>>([]);
    const [error, setError] = useState<string | null>(null);
    const [requestTime, setRequestTime] = useState<number | null>(null);
    const [excludeLabel, setExcludeLabel] = useState<string>(Cookies.get('excludeLabel') || 'person,');

    useEffect(() => {
        Cookies.set('excludeLabel', excludeLabel);
    }, [excludeLabel]);

    useEffect(() => {
        Cookies.set('model', model);
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
            // http://10.10.11.209:8102
            // http://10.10.11.88:8000
            const response = await fetch(`http://10.10.11.88:8000/yolo/detect-and-crop?excludes=${excludeLabel}&model=${model}`, {
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

    return (
        <div className="h-screen w-screen flex flex-col items-center p-[5px] bg-blue-400">
            <div className={"bg-blue-700 px-[10px] py-[5px] rounded-[10px] text-[12px]"} onClick={() => {
                const newModel = model === Model.YOLOV11N ? Model.YOLOV11X : Model.YOLOV11N;
                setModel(newModel);
            }}>Model:<strong>{model}</strong>
            </div>
            <div className={"h-[250px] mb-4"}>
                {capturedImage && (
                    <div>
                        <img src={capturedImage} alt="Captured" className="border border-gray-300 rounded rotate-0"
                             style={{height: '250px'}}/>
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
                                {/*{result.score.toFixed(3)*/}
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