import React from "react";
import { useParams, useNavigate } from "react-router";

export default function ViewMenteePage() {
    const { menteeId } = useParams<{ menteeId: string }>();
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div className="w-full h-full flex flex-col gap-4 p-4">
            <button onClick={handleBackClick} className="text-blue-500">Back</button>
            <h1 className="text-2xl font-bold">View Mentee: {menteeId}</h1>
            {/* Add your mentee details here */}
        </div>
    );
}