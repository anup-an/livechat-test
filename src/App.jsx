import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './assets/main.css';
import WebminarSearch from './components/WebminarSearch';
import WebminarServices from './components/WebminarServices';

import { createDetailsWidget } from '@livechat/agent-app-sdk';

Modal.setAppElement('#root');

const App = ({ accessToken }) => {
    const [webminarList, setWebminarList] = useState([]);
    const [servicesList, setServicesList] = useState([]);
    const [chatId, setChatId] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState();

    const openModal = () => {
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
    };

    const openWebminarList = () => {
        openModal();
        setModalContent(
            <WebminarSearch
                webminarList={webminarList}
                closeModal={closeModal}
                accessToken={accessToken}
                chatId={chatId}
            />,
        );
    };

    const openServicesList = () => {
        openModal();
        setModalContent(
            <WebminarServices
                servicesList={servicesList}
                closeModal={closeModal}
                accessToken={accessToken}
                chatId={chatId}
            />,
        );
    };

    useEffect(() =>
        createDetailsWidget()
            .then((widget) => {
                // condition that is emitted when an agent opens a conversation within Chats
                widget.on('customer_profile', (profile) => {
                    // sets chat_id
                    setChatId(profile.chat.chat_id);
                });
            })
            .catch((err) => console.log(err)),
    );

    const sendWebminarList = () => {
        const payload = {
            chat_id: chatId,
            event: {
                type: 'rich_message',
                recipients: 'all',
                template_id: 'cards',
                elements: webminarList.map((webmin) => ({
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
                })),
            },
        };
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

    useEffect(() => {
        axios
            .get(' https://api-test.meeteo.io/thirdParty/v1/list_webinars?app_id=123456')
            .then((response) => {
                console.log(response.data.data.data);
                setWebminarList(response.data.data.data);
                localStorage.setItem('webminarList', JSON.stringify(response.data.data.data));
            })
            .catch((err) => {
                return err.response;
            });
    }, []);

    useEffect(() => {
        axios
            .get('https://api-test.meeteo.io/thirdParty/v1/list_services?app_id=123456')
            .then((response) => {
                console.log(response.data.data.data);
                setServicesList(response.data.data.data);
                localStorage.setItem('servicesList', JSON.stringify(response.data.data.data));
            })
            .catch((err) => {
                return err.response;
            });
    }, []);

    return (
        <div className="border rounded shadow p-10 m-2">
            <div className="flex flex-col space-y-6">
                <div>
                    <button
                        onClick={sendWebminarList}
                        type="button"
                        className="w-full p-4 border rounded shadow bg-blue-400 hover:bg-blue-800 text-white focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-0 hover:scale-105"
                    >
                        Send upcoming webinars
                    </button>
                </div>
                <div>
                    <button
                        onClick={openServicesList}
                        type="button"
                        className="w-full p-4 border rounded shadow bg-blue-400 hover:bg-blue-800 text-white focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-0 hover:scale-105"
                    >
                        Open services list
                    </button>
                </div>

                <div>
                    <button
                        onClick={openWebminarList}
                        type="button"
                        className="w-full p-4 border rounded shadow bg-blue-400 hover:bg-blue-800 text-white focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-0 hover:scale-105"
                    >
                        Search webminars
                    </button>
                </div>
            </div>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                overlayClassName="fixed inset-0 bg-white bg-opacity-75 flex justify-center"
                className="relative bg-white overflow-y-auto focus:outline-none p-2 w-full m-1"
            >
                {modalContent}
            </Modal>
        </div>
    );
};

export default App;
