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
            className={`flex flex-row space-x-2 items-start p-1 ${
                select.id === webminar.id && select.isColored === true
                    ? 'bg-gradient-to-r from-blue-400 to-blue-900 text-white border rounded'
                    : 'bg-white'
            }`}
        >
            <div className="flex flex-col space-y-1">
                <button
                    onClick={() => selectWebminar(webminar, webminar.id)}
                    type="button"
                    className="w-5 h-5 bg-white flex items-center text-blue-800 justify-center border rounded shadow focus:outline-none"
                >
                    <svg
                        className={`h-5 w-5 ${webminar.isSelected === true ? 'block' : 'hidden'}`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                </button>
                <button
                    onClick={() => {
                        toArray(webminar);

                        sendSelectedWebminars(arr, chatId, accessToken);
                    }}
                    type="button"
                    className="border rounded shadow bg-gradient-to-r from-blue-400 to-blue-900 hover:bg-blue-800 text-white focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-0 hover:scale-105"
                >
                    <svg
                        className="w-5 h-5"
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
            <div className="border rounded shadow">
                <div className={`flex flex-row items-start justify-between space-x-4`}>
                    <div className="border-l-2 border-blue-800 flex flex-col items-center m-2 w-2/5 h-full ">
                        <div className="flex justify-center items-center w-full ml-1 text-sm">
                            <div>{new Date(webminar.startDate).toString().slice(4, 7)}</div>
                        </div>
                        <div className="flex justify-center items-center w-full ml-1">
                            <div className="text-xs">{new Date(webminar.startDate).toString().slice(8, 10)}</div>
                        </div>
                    </div>

                    <div className="p-2 w-full flex flex-col justify-around items-center">
                        <div>
                            <div className="w-48 truncate text-sm">
                                <span className={`${webminar.title !== null ? 'visible' : 'invisible'}`}>
                                    {webminar.title}
                                </span>
                            </div>
                            <div className="flex flex-row items-end space-x-4">
                                <div className="text-xs text-blue-800 flex flex-row items-end">
                                    <svg
                                        className={`w-5 h-5 ${
                                            select.id === webminar.id && select.isColored === true
                                                ? 'text-white'
                                                : 'text-gray-500'
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
                                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                        />
                                    </svg>
                                    <div
                                        className={`${
                                            select.id === webminar.id && select.isColored === true
                                                ? 'text-white'
                                                : 'text-blue-800'
                                        }`}
                                    >
                                        {webminar.maxLimit ? webminar.maxLimit : 0}
                                    </div>
                                </div>

                                <div className="text-xs text-blue-800 flex flex-row items-end">
                                    <svg
                                        className={`w-5 h-5 ${
                                            select.id === webminar.id && select.isColored === true
                                                ? 'text-white'
                                                : 'text-gray-500'
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
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <div
                                        className={`${
                                            select.id === webminar.id && select.isColored === true
                                                ? 'text-white'
                                                : 'text-blue-800'
                                        }`}
                                    >
                                        {webminar.startTime}
                                    </div>
                                </div>
                                {Number(webminar.price) === 0 ? (
                                    <div className={`flex flex-row items-end text-blue-800`}>
                                        <svg
                                            className={`w-5 h-5 ${
                                                select.id === webminar.id && select.isColored === true
                                                    ? 'text-white'
                                                    : 'text-gray-500'
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
                                                d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <div
                                            className={`text-xs ${
                                                select.id === webminar.id && select.isColored === true
                                                    ? 'text-white'
                                                    : 'text-blue-800'
                                            }`}
                                        >
                                            Free
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        className={`text-xs${
                                            select.id === webminar.id && select.isColored === true
                                                ? 'text-white'
                                                : 'text-blue-800'
                                        }`}
                                    >
                                        {webminar.price}
                                    </div>
                                )}
                            </div>

                            <div className={`flex flex-col ${details ? 'block' : 'hidden'}`}>
                                <div className="w-48 truncate text-xs text-gray-500">
                                    <span>{webminar.description}</span>
                                </div>
                                {webminar.webinarType.name === 'Live' ? (
                                    <div className="text-xs flex flex-row items-end">
                                        <svg
                                            className={`w-5 h-5 fill-stroke ${
                                                select.id === webminar.id && select.isColored === true
                                                    ? 'text-white'
                                                    : 'text-gray-500'
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
                                                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <div className="text-blue-800">{webminar.webinarType.name}</div>
                                    </div>
                                ) : (
                                    <div className="text-xs flex flex-row items-end">
                                        <svg
                                            className={`w-5 h-5 fill-stroke ${
                                                select.id === webminar.id && select.isColored === true
                                                    ? 'text-white'
                                                    : 'text-gray-500'
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
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <div className="text-blue-800">{webminar.webinarType.name}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <button
                            className={`flex items-center justify-center focus:outline-none ${
                                details ? 'hidden' : 'block'
                            }`}
                            type="button"
                            onClick={() => setDetails(true)}
                        >
                            <svg
                                className={`w-4 h-4 ${
                                    select.id === webminar.id && select.isColored === true
                                        ? 'text-white'
                                        : 'text-blue-800'
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
                                    d="M19 9l-7 7-7-7"
                                />
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
                                className={`w-4 h-4 ${
                                    select.id === webminar.id && select.isColored === true
                                        ? 'text-white'
                                        : 'text-blue-800'
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
                                    d="M5 15l7-7 7 7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default WebminarDisplay;
