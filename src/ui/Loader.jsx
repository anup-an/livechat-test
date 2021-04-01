import React from 'react';

const Loader = () => {
    return (
        <div className="text-blue flex flex-row">
            <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg>
            <div>Signing with livechat</div>
        </div>
    );
};

export default Loader;
