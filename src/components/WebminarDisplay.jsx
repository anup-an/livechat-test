import React from 'react';
import { formatCurrency } from '../utils/index';
import { createMessageBoxWidget } from '@livechat/agent-app-sdk';

const sendMessage = (webminar) => {
    createMessageBoxWidget().then((widget) => {
        const richMessage = {
            template_id: 'cards',
            elements: [
                {
                    title: 'My cat photo',
                    image: 'imgs/john-the-cat.jpg',
                    url: `${webminar.url}`,
                },
            ],
        };

        widget.putMessage(richMessage);
    });
};

const WebminarDisplay = ({ webminar }) => {
    return (
        <div className="border-l-2 border-blue-800 p-1 flex flex-row space-x-6 transition duration-500 ease-in-out transform hover:-translate-y-0 hover:scale-105">
            <div className="mx-2">
                <div>{new Date(webminar.startDate).toString().slice(4, 10)}</div>

                <button
                    onClick={() => sendMessage(webminar)}
                    type="button"
                    className="py-1 px-2 border rounded shadow bg-blue-400 hover:bg-blue-800 text-white focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-0 hover:scale-105"
                >
                    Send
                </button>
            </div>
            <div>
                <div>{webminar.title}</div>
                {Number(webminar.price) === 0 ? (
                    <div className="text-sm text-blue-400">Free</div>
                ) : (
                    <div className="text-sm text-blue-400">{formatCurrency(Number(webminar.price))}</div>
                )}
            </div>
        </div>
    );
};
export default WebminarDisplay;
