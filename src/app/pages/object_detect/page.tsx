"use client";
import {useState} from 'react';

export default function ObjectDetect() {
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [result, setResult] = useState<{ label: string, score: number, image: string } | null>(null);
    const [error, setError] = useState<string | null>(null);

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
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://127.0.0.1:8000/detect_objects/', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                },
                body: formData,
            });
            const result = await response.json();
            setResult(result[0]); // Assuming the API returns an array with one object
        } catch (error) {
            console.error('Error sending image to API:', error);
            setError('Failed to process the image. Please try again.');
        }
    };

    return (
        <div className="h-screen w-screen flex flex-col items-center p-4 bg-blue-400">

            <div className={"h-[200px] mb-4"}>
                {capturedImage && (
                    <div className="">
                        <h3 className="text-lg font-bold mb-2">Captured Image:</h3>
                        <img src={capturedImage} alt="Captured" className="border border-gray-300 rounded"
                             style={{height: '200px'}}/>
                    </div>
                )}
            </div>

            <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4 border rounded p-2"/>

            {result && (
                <div>
                    <h3 className="text-lg font-bold mb-2">Result:</h3>
                    <p>Label: {result.label}</p>
                    <p>Score: {result.score}</p>
                    <img src={`data:image/png;base64,${result.image}`} alt="Result"
                         className="border border-gray-300 rounded"/>
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