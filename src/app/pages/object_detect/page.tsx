"use client";
import { useRef, useState } from 'react';

export default function ObjectDetect() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [result, setResult] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageData = reader.result as string;
                setCapturedImage(imageData);
                sendImageToAPI(imageData);
            };
            reader.readAsDataURL(file);
        }
    };

    const sendImageToAPI = async (imageData: string) => {
        try {
            const response = await fetch('YOUR_API_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image: imageData }),
            });
            const result = await response.json();
            setResult(result.message); // Assuming the API returns a message field
        } catch (error) {
            console.error('Error sending image to API:', error);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
            <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }} />
            {capturedImage && (
                <div className="mb-4">
                    <h3 className="text-lg font-bold mb-2">Captured Image:</h3>
                    <img src={capturedImage} alt="Captured" className="border border-gray-300" />
                </div>
            )}
            {result && (
                <div>
                    <h3 className="text-lg font-bold mb-2">Result:</h3>
                    <p>{result}</p>
                </div>
            )}
        </div>
    );
}