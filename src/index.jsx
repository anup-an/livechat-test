import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import config from '../src/utils/config';
import { accountsSdk } from '@livechat/accounts-sdk';
import Loader from '../src/ui/Loader';

const AppAuth = () => {
    /*     const accessToken = useLiveChat(config.client_id, config.account_url);
     */
    const [accessToken, setAccessToken] = useState(null);
    const [display, setDisplay] = useState(true);

    const signIn = () => {
        const instance = new accountsSdk.init({
            client_id: config.client_id,
            response_type: 'token',
            onIdentityFetched: (error, data) => {
                console.log(data);
                if (data && data.access_token) {
                    setAccessToken(data.access_token);
                } else {
                    window.location.href = `${config.account_url}?response_type=token&client_id=${config.client_id}&redirect_uri=${window.location.href}`;
                }
            },
        });
        instance.openPopup();
        setDisplay(false);
    };

    return (
        <div>
            {display ? (
                <button className="p-4 bg-blue-400 hover:bg-blue-800 text-white border rounded shadow" onClick={signIn}>
                    Sign In With LiveChat
                </button>
            ) : (
                ''
            )}
            {accessToken ? (
                <div>
                    <App accessToken={accessToken} />
                </div>
            ) : (
                ''
            )}
        </div>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <AppAuth />
    </React.StrictMode>,
    document.getElementById('root'),
);
