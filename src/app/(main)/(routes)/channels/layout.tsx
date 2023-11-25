import React from 'react';
import RoomsNavbar from "@/components/navigation/rooms-navbar";

interface LayoutProps {
    children: React.ReactNode;
};

function Layout({children}: LayoutProps) {
    return (
        <>
            <RoomsNavbar/>

            <div className="absolute left-[240px] right-0 inset-y-0 bg-red-500">
                {children}
            </div>
        </>
    );
};

export default Layout;