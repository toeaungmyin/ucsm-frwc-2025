import React from 'react'
import Nav from './nav'

export default function layout({ children }: { children: React.ReactNode }) {

    return (
        <div className="bg-gray-200 min-h-[100vh]">
            <Nav/>
            {children}
        </div>
    );
}
