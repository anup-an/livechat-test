import React, { useState, useContext } from 'react';
import { formatCurrency } from '../../utils/index';
import { sendSelectedWebminars } from '../../utils/config';
import WebminarContext from '../../context/webminars';

// import * as LiveChat from '@livechat/agent-app-sdk';

const WebminarDisplay = ({ webminar, accessToken, chatId, window }) => {
    const { selectWebminar } = useContext(WebminarContext);

    const [arr, setArr] = useState([]);
    const toArray = (webmin) => {
        setArr(arr.push(webmin));
    };

    return (
        <div className="flex justify-between items-center">
            <div className="border-l-2 border-blue-800 p-1 flex flex-row  justify-between space-x-10 transition duration-500 ease-in-out transform hover:-translate-y-0 hover:scale-105">
                <div className="mx-2">
                    {window === 'services' ? <div>{webminar.name}</div> : ''}
                    {window === 'webminars' ? (
                        <div>
                            <div className="text-lg">{new Date(webminar.startDate).toString().slice(4, 7)}</div>
                            <div className="content-center text-center">
                                {new Date(webminar.startDate).toString().slice(8, 10)}
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
                <div>
                    {window === 'services' ? (
                        <div className="overflow-ellipsis overflow-hidden">{webminar.description}</div>
                    ) : (
                        ''
                    )}
                    {window === 'webminars' ? (
                        <div className="overflow-ellipsis overflow-hidden">{webminar.title}</div>
                    ) : (
                        ''
                    )}

                    {window === 'webminars' ? (
                        Number(webminar.price) === 0 ? (
                            <div className="text-sm text-blue-400">Free</div>
                        ) : (
                            <div className="text-sm text-blue-400">{formatCurrency(Number(webminar.price))}</div>
                        )
                    ) : (
                        ''
                    )}
                    {window === 'services' ? (
                        Number(webminar.onlinePrice) === 0 ? (
                            <div className="text-sm text-blue-400">Free</div>
                        ) : (
                            <div className="text-sm text-blue-400">{formatCurrency(Number(webminar.onlinePrice))}</div>
                        )
                    ) : (
                        ''
                    )}
                </div>
            </div>
            <div className="flex justify-between">
                <button
                    onClick={() => selectWebminar(webminar, webminar.id)}
                    type="button"
                    className="w-6 h-6 bg-white flex items-center text-blue-400 justify-center border rounded shadow focus:outline-none"
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
                    className="w-6 h-6 hover:bg-blue-800 text-blue-400 hover:text-white border rounded shadow flex items-center justify-center focus:outline-none"
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
        </div>
    );
};
export default WebminarDisplay;
