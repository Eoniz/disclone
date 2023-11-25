import React from 'react';
import DiscordSakuraImg from "@/assets/logo/discord-sakura.webp";
import Image from "next/image";

interface DiscordSakuraLogoProps {

};

function DiscordSakuraLogo({}: DiscordSakuraLogoProps) {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" className="svg_ad7356" overflow="visible">
            <defs>
                <path
                    d="M0 24C0 16.5449 0 12.8174 1.21793 9.87706C2.84183 5.95662 5.95662 2.84183 9.87706 1.21793C12.8174 0 16.5449 0 24 0C31.4551 0 35.1826 0 38.1229 1.21793C42.0434 2.84183 45.1582 5.95662 46.7821 9.87706C48 12.8174 48 16.5449 48 24C48 31.4551 48 35.1826 46.7821 38.1229C45.1582 42.0434 42.0434 45.1582 38.1229 46.7821C35.1826 48 31.4551 48 24 48C16.5449 48 12.8174 48 9.87706 46.7821C5.95662 45.1582 2.84183 42.0434 1.21793 38.1229C0 35.1826 0 31.4551 0 24Z"
                    id="c6b0adf8-7f75-432f-8d0e-75de6af84a5b-blob_mask"></path>
            </defs>
            <mask id="c6b0adf8-7f75-432f-8d0e-75de6af84a5b" fill="black" x="0" y="0" width="48" height="48">
                <use href="#c6b0adf8-7f75-432f-8d0e-75de6af84a5b-blob_mask" fill="white" className=""></use>
            </mask>
            <foreignObject mask="url(#c6b0adf8-7f75-432f-8d0e-75de6af84a5b)" x="0" y="0" width="48" height="48">
                <div className="wrapper_d281dd selected_f5ec8e" role="treeitem" data-list-item-id="guildsnav___home"
                     tabIndex={-1} aria-label="Direct Messages">
                    <div className="childWrapper__01b9c"><Image src={DiscordSakuraImg} width="48"
                                                                alt="App Icon" draggable="false"/></div>
                </div>
            </foreignObject>
        </svg>
    );
};

export default DiscordSakuraLogo;