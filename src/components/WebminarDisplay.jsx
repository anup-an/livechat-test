import React from 'react';
import { formatCurrency } from '../utils/index';
// import * as LiveChat from '@livechat/agent-app-sdk';

import axios from 'axios';

const WebminarDisplay = ({ webminar, accessToken, chatId }) => {
    const sendWebminar = (webmin) => {
        const payload = {
            chat_id: chatId,
            event: {
                type: 'rich_message',
                recipients: 'all',
                template_id: 'cards',
                elements: [
                    {
                        title: `${webmin.title}`,
                        subtitle: `${webmin.price}`,
                        image: {
                            size: 123444,
                            width: 640,
                            height: 480,
                            url: 'https://images.pexels.com/photos/34950/pexels-photo.jpg',
                        },
                        buttons: [
                            {
                                text: 'Join webminar',
                                postback_id: 'action_yes',
                                type: 'webview',
                                value: `${webmin.webinarUrl}`,
                                webview_height: 'full',
                                user_ids: [],
                            },
                        ],
                    },
                ],
            },
        };

        /* {
            chat_id: chat_id,
            template_id: 'cards',
            elements: [
                {
                    title: `${webminar.title}`,
                    image: { url: 'https://unsplash.com/photos/smgTvepind4' },
                    buttons: [
                        {
                            text: 'Join webminar',
                            type: 'webview',
                            value: `${webminar.url}`,
                            webview_height: 'full',
                            postback_id: 'action_yes',
                            user_ids: [],
                        },
                    ],
                },
            ],
        }; */
        console.log(payload);
        axios
            .post(
                'https://api.livechatinc.com/v3.2/agent/action/send_event',

                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            )
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    return (
        <div className="border-l-2 border-blue-800 p-1 flex flex-row space-x-6 transition duration-500 ease-in-out transform hover:-translate-y-0 hover:scale-105">
            <div className="mx-2">
                <div>{new Date(webminar.startDate).toString().slice(4, 10)}</div>

                <button
                    onClick={() => sendWebminar(webminar)}
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
