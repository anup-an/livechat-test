import React from 'react';
import { Zoom } from 'react-awesome-reveal';

const WebminarToSend = ({ webminar, deleteWebminar }) => {
    return (
        <div className=" transition duration-500 ease-in-out transform hover:translate-y-0 hover:scale-105">
            <button onClick={() => deleteWebminar(webminar.id)} type="button">
                <div className={`absolute z-10 -mt-1 -ml-1.5 border rounded-full bg-red-600 text-white`}>
                    <svg
                        className="h-3 w-3"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </div>
            </button>
            <div className={` p-4 w-14 h-14 border rounded shadow focus:outline-none flex items-center justify-center`}>
                <div className="text-xs text-center">{new Date(webminar.startDate).toString().slice(4, 10)}</div>
            </div>
        </div>
    );
};

export default WebminarToSend;
