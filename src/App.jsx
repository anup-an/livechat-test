import { createDetailsWidget } from '@livechat/agent-app-sdk';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './assets/main.css';
import Modals from './components/modal';
import WebminarContext from './context/webminars';
import useWebminars from './hooks/useWebminars';
import Frontpage from './components/frontpage';

Modal.setAppElement('#root');

const App = ({ accessToken }) => {
    const [webminarList, setWebminarList] = useState([]);
    const [servicesList, setServicesList] = useState([]);
    const [consultantsList, setConsultantsList] = useState([]);

    const [chatId, setChatId] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState();
    const [window, setWindow] = useState('');

    const openModal = () => {
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
        setWindow('');
    };

    const openList = (list) => {
        openModal();
        setWindow(list);
        setModalContent(
            <Modals
                closeModal={closeModal}
                accessToken={accessToken}
                chatId={chatId}
                window={list}
                openList={openList}
            />,
        );
    };

    useEffect(() => {
        createDetailsWidget()
            .then((widget) => {
                // condition that is emitted when an agent opens a conversation within Chats
                widget.on('customer_profile', (profile) => {
                    console.log(profile.chat);
                    // sets chat_id
                    setChatId(profile.chat.chat_id);
                });
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        axios
            .get(` https://api-test.meeteo.io/thirdParty/v1/list_webinars?app_id=678901`)
            .then((response) => {
                setWebminarList(response.data.data.data);
                localStorage.setItem(
                    'webminarList',
                    JSON.stringify(
                        response.data.data.data.map((e) => ({ ...e, isSelected: false, isDisplayed: true })),
                    ),
                );
            })
            .catch((err) => {
                return err.response;
            });
    }, []);

    useEffect(() => {
        axios
            .get(` https://api-test.meeteo.io/thirdParty/v1/list_services?app_id=678901`)
            .then((response) => {
                setServicesList(response.data.data.data);
                localStorage.setItem(
                    'servicesList',
                    JSON.stringify(
                        response.data.data.data.map((e) => ({ ...e, isSelected: false, isDisplayed: true })),
                    ),
                );
            })
            .catch((err) => {
                return err.response;
            });
    }, []);

    useEffect(() => {
        axios
            .get(` https://api-test.meeteo.io/thirdParty/v1/list_consultants?app_id=678901`)
            .then((response) => {
                console.log(response.data.data.data);
                setConsultantsList(response.data.data.data);
                localStorage.setItem(
                    'consultantsList',
                    JSON.stringify(
                        response.data.data.data.map((e) => ({ ...e, isSelected: false, isDisplayed: true })),
                    ),
                );
            })
            .catch((err) => {
                return err.response;
            });
    }, []);

    return (
        <div>
            <Frontpage webminarList={webminarList} chatId={chatId} accessToken={accessToken} openList={openList} />

            <WebminarContext.Provider value={useWebminars(window)}>
                <Modal
                    isOpen={isOpen}
                    onRequestClose={closeModal}
                    overlayClassName="fixed inset-0 bg-white bg-opacity-75 flex justify-center"
                    className="relative bg-white overflow-y-auto focus:outline-none w-screen"
                >
                    {modalContent}
                </Modal>
            </WebminarContext.Provider>
        </div>
    );
};

export default App;
