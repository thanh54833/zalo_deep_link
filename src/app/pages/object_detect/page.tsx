"use client";
import {useState} from 'react';

export default function ObjectDetect() {
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [results, setResults] = useState<Array<{ label: string, score: number, image: string }>>([]);
    const [error, setError] = useState<string | null>(null);
    const [requestTime, setRequestTime] = useState<number | null>(null);

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
            const response = await fetch('http://127.0.0.1:8000/detect_objects/', {
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
        <div className="h-screen w-screen flex flex-col items-center p-4 bg-blue-400">
            <div className={"h-[350px] mb-4"}>
                {capturedImage && (
                    <div>
                        <h3 className="text-lg font-bold mb-2">Captured Image:</h3>
                        <img src={capturedImage} alt="Captured" className="border border-gray-300 rounded"
                             style={{height: '400px'}}/>
                    </div>
                )}
            </div>
            <input type="file" accept="image/*" onChange={handleFileChange}
                   className="mt-[10px] mb-4 border rounded p-2"/>
            {results.length > 0 && (
                <div>
                    <h3 className="text-lg font-bold mb-2 flex flex-row">
                        Results: {requestTime !== null ? `${requestTime.toFixed(2)} ms` : ''}
                    </h3>
                    <div className="flex flex-row flex-wrap">
                        {results.map((result, index) => (
                            <div key={index} className="mb-4 mr-4">
                                <img src={`data:image/png;base64,${result.image}`} alt="Result"
                                     className="border border-gray-300 rounded h-[200px] w-[200px]"/>
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