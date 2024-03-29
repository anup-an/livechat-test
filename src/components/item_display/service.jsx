import React, { useContext, useState } from 'react';
import WebminarContext from '../../context/webminars';
import { sendSelectedWebminars } from '../../utils/config';
import { formatCurrency } from '../../utils/index';

// import * as LiveChat from '@livechat/agent-app-sdk';

const ServiceDisplay = ({ webminar, accessToken, chatId, window }) => {
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
            <div className={`border-l-2 border-blue-800 p-1 flex flex-row  justify-between space-x-10`}>
                <div className="mx-2">
                    <div>{webminar.name}</div>
                </div>
                <div>
                    <div className="overflow-ellipsis overflow-hidden">{webminar.description}</div>

                    {Number(webminar.onlinePrice) === 0 ? (
                        <div className="text-sm text-white">Free</div>
                    ) : (
                        <div className="text-sm text-white">{formatCurrency(Number(webminar.onlinePrice))}</div>
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
                    className={`w-6 h-6 hover:bg-blue-800 text-blue-400 hover:text-white border rounded shadow flex items-center justify-center focus:outline-none`}
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
        </div>
    );
};
export default ServiceDisplay;
