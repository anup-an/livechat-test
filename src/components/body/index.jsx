import React, { useContext } from 'react';
import WebminarContext from '../../context/webminars';
import ConsultantDisplay from '../item_display/consultant';
import ServiceDisplay from '../item_display/service';
import WebminarDisplay from '../item_display/webminar';

const Body = ({ accessToken, chatId, window }) => {
    const { selectedWebminars, selectWebminar } = useContext(WebminarContext);
    return (
        <main className="mt-32 mb-20 flex items-center justify-center" key={window}>
            <div className="flex flex-col key={window} space-y-4">
                {selectedWebminars.map((webminar) =>
                    webminar.isDisplayed === true ? (
                        <div key={webminar.id}>
                            <div className="h-full">
                                {window === 'webinars' ? (
                                    <WebminarDisplay
                                        webminar={webminar}
                                        accessToken={accessToken}
                                        chatId={chatId}
                                        selectWebminar={selectWebminar}
                                        window={window}
                                    />
                                ) : (
                                    ''
                                )}
                                {window === 'services' ? (
                                    <ServiceDisplay
                                        webminar={webminar}
                                        accessToken={accessToken}
                                        chatId={chatId}
                                        selectWebminar={selectWebminar}
                                        window={window}
                                    />
                                ) : (
                                    ''
                                )}
                                {window === 'consultants' ? (
                                    <ConsultantDisplay
                                        webminar={webminar}
                                        accessToken={accessToken}
                                        chatId={chatId}
                                        selectWebminar={selectWebminar}
                                        window={window}
                                    />
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>
                    ) : (
                        ''
                    ),
                )}
            </div>
        </main>
    );
};

export default Body;
