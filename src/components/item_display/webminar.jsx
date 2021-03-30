import React, { useState, useContext } from 'react';
import { formatCurrency } from '../../utils/index';
import { sendSelectedWebminars } from '../../utils/config';
import WebminarContext from '../../context/webminars';

// import * as LiveChat from '@livechat/agent-app-sdk';

const WebminarDisplay = ({ webminar, accessToken, chatId, window }) => {
    const { select, selectWebminar } = useContext(WebminarContext);

    const [arr, setArr] = useState([]);
    const toArray = (webmin) => {
        setArr([...arr, webmin]);
    };

    const [details, setDetails] = useState(false);
    return (
        <div
            id={`${webminar.id}`}
            className={`flex space-x-2 items-start p-1 ${
                select.id === webminar.id && select.isColored === true
                    ? 'bg-gradient-to-r from-blue-400 to-blue-900 text-white border rounded'
                    : 'bg-white'
            }`}
        >
            <div className="border rounded shadow-lg">
                <div className={`flex flex-row items-start justify-between space-x-4`}>
                    <div className="border-l-2 border-blue-800 flex flex-col items-center m-2 w-2/5 h-full ">
                        <div className="flex justify-center items-center w-full ml-1">
                            <div>{new Date(webminar.startDate).toString().slice(4, 7)}</div>
                        </div>
                        <div className="flex justify-center items-center w-full text-gray-500 ml-1">
                            <div className="text-sm text-gray-500">
                                {new Date(webminar.startDate).toString().slice(8, 10)}
                            </div>
                        </div>
                    </div>

                    <div className="p-2 w-full flex flex-col justify-around items-center">
                        <div>
                            <div className="w-56 truncate">
                                <span className={`${webminar.title !== null ? 'visible' : 'invisible'}`}>
                                    {webminar.title}
                                </span>
                            </div>
                            <div className="w-56 truncate text-sm text-gray-500">
                                <span>{webminar.description}</span>
                            </div>
                            <div className="flex flex-row items-end space-x-4">
                                {Number(webminar.price) === 0 ? (
                                    <div
                                        className={`flex items-end text-blue-800 ${
                                            select.id === webminar.id && select.isColored === true
                                                ? 'text-white text-xs p-1'
                                                : 'text-blue-400 text-xs p-1'
                                        }`}
                                    >
                                        <div>Free</div>
                                    </div>
                                ) : (
                                    <div
                                        className={`flex items-end text-blue-800 ${
                                            select.id === webminar.id && select.isColored === true
                                                ? 'text-white text-xs p-1'
                                                : 'text-blue-400 text-xs p-1'
                                        }`}
                                    >
                                        {formatCurrency(Number(webminar.price))}
                                    </div>
                                )}
                                <div className="text-xs text-blue-800 flex flex-row items-end">
                                    <svg
                                        className="w-5 h-5 text-gray-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <div>{webminar.startTime}</div>
                                </div>
                                <div className="flex flex-row">
                                    <button
                                        onClick={() => selectWebminar(webminar, webminar.id)}
                                        type="button"
                                        className="w-6 h-6 bg-white flex items-center text-blue-400 justify-center border rounded shadow focus:outline-none"
                                    >
                                        <svg
                                            className={`h-5 w-5 border-2 ${
                                                webminar.isSelected === true ? 'block' : 'hidden'
                                            }`}
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => sendSelectedWebminars(toArray(webminar), chatId, accessToken)}
                                        type="button"
                                        className="py-1 px-1 border rounded shadow bg-gradient-to-r from-blue-400 to-blue-900 hover:bg-blue-800 text-white focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-0 hover:scale-105"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className={`lex flex-col ${details ? 'block' : 'hidden'}`}>
                                <div className="text-xs">Duration: {webminar.estimatedTime}</div>
                                <div className="text-xs">Max limit: {webminar.maxLimit}</div>
                            </div>
                        </div>
                    </div>
                    <button
                        className={`flex items-center justify-center transition duration-500 ease-in-out transform hover:translate-y-0 hover:scale-102 focus:outline-none ${
                            details ? 'hidden' : 'block'
                        }`}
                        type="button"
                        onClick={() => setDetails(true)}
                    >
                        <svg
                            className="w-5 h-5 text-blue-800"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <button
                        className={`flex items-center justify-center focus:outline-none ${
                            details ? 'block' : 'hidden'
                        }`}
                        type="button"
                        onClick={() => setDetails(false)}
                    >
                        <svg
                            className="w-5 h-5 text-blue-800"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};
export default WebminarDisplay;
