import React, { useState, useContext } from 'react';
import { formatCurrency } from '../../utils/index';
import { sendSelectedWebminars } from '../../utils/config';
import WebminarContext from '../../context/webminars';

// import * as LiveChat from '@livechat/agent-app-sdk';

const WebminarDisplay = ({ webminar, accessToken, chatId, window }) => {
    const { select, selectWebminar } = useContext(WebminarContext);

    const [arr, setArr] = useState([]);
    const toArray = (webmin) => {
        setArr(arr.push(webmin));
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
            <div className="flex flex-col">
                <button
                    onClick={() => selectWebminar(webminar, webminar.id)}
                    type="button"
                    className="w-5 h-5 bg-white flex items-center text-blue-400 justify-center border rounded shadow focus:outline-none"
                >
                    <svg
                        className={`h-4 w-4 ${webminar.isSelected === true ? 'block' : 'hidden'}`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                </button>

                <button
                    type="button"
                    onClick={() => {
                        toArray(webminar);
                        sendSelectedWebminars(arr, chatId, accessToken);
                    }}
                    className={`w-5 h-5 hover:bg-blue-800 text-blue-400 hover:text-white border rounded shadow flex items-center justify-center focus:outline-none`}
                >
                    <svg
                        className={`w-5 h-5 ${
                            select.id === webminar.id && select.isColored === true ? 'text-white' : ''
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
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                    </svg>
                </button>
            </div>
            <div className={`border-l-2 border-blue-800 flex flex-row items-start justify-around space-x-4`}>
                <div className="border rounded shadow-lg flex flex-col items-center ml-2 w-1/4 h-full">
                    <div className="flex justify-center items-center border-b w-full h-full">
                        <div className="text-xs p-1">{new Date(webminar.startDate).toString().slice(4, 10)}</div>
                    </div>
                    {Number(webminar.price) === 0 ? (
                        <div
                            className={`${
                                select.id === webminar.id && select.isColored === true
                                    ? 'text-white text-xs p-1'
                                    : 'text-blue-400 text-xs p-1'
                            }`}
                        >
                            Free
                        </div>
                    ) : (
                        <div
                            className={`${
                                select.id === webminar.id && select.isColored === true
                                    ? 'text-white text-xs p-1'
                                    : 'text-blue-400 text-xs p-1'
                            }`}
                        >
                            {formatCurrency(Number(webminar.price))}
                        </div>
                    )}
                </div>

                <div className="border rounded shadow-lg p-2 w-full flex flex-col justify-around items-start">
                    <div>
                        <div className="w-56 truncate text-xs">
                            <span>Title: {webminar.title}</span>
                        </div>
                        <div className="text-xs">
                            Start: {webminar.startTime} ({webminar.timezone})
                        </div>
                        <div className={`lex flex-col ${details ? 'block' : 'hidden'}`}>
                            <div className="text-xs">Duration: {webminar.estimatedTime}</div>
                            <div className="text-xs">Max limit: {webminar.maxLimit}</div>
                        </div>
                    </div>
                    <button
                        className={`w-5 h-5 hover:bg-blue-800 text-blue-400 hover:text-white border rounded shadow flex items-center justify-center focus:outline-none ${
                            details ? 'hidden' : 'block'
                        }`}
                        type="button"
                        onClick={() => setDetails(true)}
                    >
                        <svg
                            className="text-blue-400 hover:text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
                            />
                        </svg>
                    </button>
                    <button
                        className={`w-5 h-5 hover:bg-blue-800 text-blue-400 hover:text-white border rounded shadow flex items-center justify-center focus:outline-none ${
                            details ? 'block' : 'hidden'
                        }`}
                        type="button"
                        onClick={() => setDetails(false)}
                    >
                        <svg
                            className="text-blue-400 hover:text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 11l7-7 7 7M5 19l7-7 7 7"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};
export default WebminarDisplay;
