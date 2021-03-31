/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Header from '../header';
import Body from '../body';
import Footer from '../footer';
import { Slide } from 'react-awesome-reveal';

const Modals = ({ closeModal, accessToken, chatId, window, openList }) => {
    return (
        <div className="h-screen">
            <Header closeModal={closeModal} window={window} />

            <Slide right cascade>
                <Body accessToken={accessToken} chatId={chatId} window={window} />
            </Slide>
            <Footer chatId={chatId} accessToken={accessToken} openList={openList} />
        </div>
    );
};

export default Modals;
