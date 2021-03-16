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

    return (
        <div
            id={`${webminar.id}`}
            className={`flex justify-between items-center p-1 ${
                select.id === webminar.id && select.isColored === true
                    ? 'bg-blue-400 text-white border rounded'
                    : 'bg-white'
            }`}
        >
            <div className={`border-l-2 border-blue-800 p-1 flex flex-row justify-between space-x-10`}>
                <div className="mx-2">
                    <div className="flex flex-col">
                        <div className="flex flex-row w-12 h-12">
                            <div>
                                <button
                                    onClick={() => selectWebminar(webminar, webminar.id)}
                                    type="button"
                                    className="w-4 h-4 bg-white flex items-center text-blue-400 justify-center border rounded shadow focus:outline-none"
                                >
                                    <svg
                                        className={`h-3 w-3 ${webminar.isSelected === true ? 'block' : 'hidden'}`}
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
                                    type="button"
                                    onClick={() => {
                                        toArray(webminar);
                                        sendSelectedWebminars(arr, chatId, accessToken);
                                    }}
                                    className={`w-4 h-4 hover:bg-blue-800 text-blue-400 hover:text-white border rounded shadow flex items-center justify-center focus:outline-none`}
                                >
                                    <svg
                                        className={`w-3 h-3 ${
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
                                <button
                                    className="w-4 h-4 hover:bg-blue-800 border rounded shadow text-center"
                                    type="button"
                                >
                                    <svg
                                        className="w-3 h-3 text-blue-400 hover:text-white"
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
                            </div>

                            <div className="border rounded w-12 h-12 text-center ">
                                <div className="content-center text-center">
                                    {new Date(webminar.startDate).toString().slice(4, 7)}
                                </div>
                                <div className="content-center text-center text-sm">
                                    {new Date(webminar.startDate).toString().slice(8, 10)}
                                </div>
                            </div>
                        </div>
                        {Number(webminar.price) === 0 ? (
                            <div
                                className={`${
                                    select.id === webminar.id && select.isColored === true
                                        ? 'text-white text-sm text-center'
                                        : 'text-blue-400 text-sm text-center'
                                }`}
                            >
                                Free
                            </div>
                        ) : (
                            <div
                                className={`${
                                    select.id === webminar.id && select.isColored === true
                                        ? 'text-white text-sm text-center'
                                        : 'text-blue-400 text-sm text-center'
                                }`}
                            >
                                {formatCurrency(Number(webminar.price))}
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <div className="overflow-ellipsis overflow-hidden text-sm">Title: {webminar.title}</div>
                    <div className="text-sm">
                        Start: {webminar.startTime} ({webminar.timezone})
                    </div>
                </div>
            </div>
        </div>
    );
};
export default WebminarDisplay;
