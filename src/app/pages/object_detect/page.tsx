"use client";
import {useState} from 'react';

export default function ObjectDetect() {
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [results, setResults] = useState<Array<{ label: string, score: number, image: string }>>([]);
    const [error, setError] = useState<string | null>(null);
    const [requestTime, setRequestTime] = useState<number | null>(null);
    const [excludeLabel, setExcludeLabel] = useState<string>('personal,');

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
        excludeLabel.split(',').forEach(label => formData.append('excludes', label));

        const startTime = performance.now();

        try {
            const response = await fetch('http://192.168.111.119:8000/yolo/detect-and-crop/', {
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

    return (
        <div className="h-screen w-screen flex flex-col items-center p-[5px] bg-blue-400">
            <div className={"h-[250px] mb-4"}>
                {capturedImage && (
                    <div>
                        <img src={capturedImage} alt="Captured" className="border border-gray-300 rounded rotate-0"
                             style={{height: '250px'}}/>
                    </div>
                )}
            </div>

            <input type="text" value={excludeLabel} onChange={(e) => setExcludeLabel(e.target.value)}
                   className="w-screen mx-5 mb-[4px] rounded-[10px] p-2 text-black bg-white"
                   placeholder="Exclude Label"/>
            <input type="file" accept="image/*" onChange={handleFileChange}
                   className="w-screen mx-5 mb-4 rounded-[10px] p-2 text-white bg-blue-700" title="Choose File"/>

            {results.length > 0 && (
                <div>
                    <h3 className="text-lg font-bold mb-2 flex flex-row">
                        Results: {requestTime !== null ? `${requestTime.toFixed(2)} ms` : ''}
                    </h3>
                    <div className="flex flex-row flex-wrap">
                        {results.map((result, index) => (
                            <div key={index} className="m-[2px]">
                                <div className={"text-[10px]"}>{result.label} {result.score.toFixed(3)}</div>
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