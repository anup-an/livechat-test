import { createDetailsWidget } from '@livechat/agent-app-sdk';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './assets/main.css';
import Modals from './components/modal';
import WebminarContext from './context/webminars';
import useWebminars from './hooks/useWebminars';
import Frontpage from './components/frontpage';
import { getMeeteoData } from './utils/config';

Modal.setAppElement('#root');

const App = ({ authData }) => {
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
                accessToken={authData.access_token}
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
        getMeeteoData(setWebminarList, setServicesList, setConsultantsList);
    }, []);

    return (
        <div>
            <Frontpage
                webminarList={webminarList}
                chatId={chatId}
                accessToken={authData.access_token}
                openList={openList}
            />

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
