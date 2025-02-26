import React from 'react'
import Header from './_component/Header'
import SideBar from './_component/SideBar'

export default function DashboardLayout({ children }) {
    return (
        <div>
                <div className='md:w-64 h-screen fixed'>
                        <SideBar/>
                </div>
                <div className='md:ml-64'>

                        <Header />
                        <div className='p-10'>

                                {children}

                        </div>
                </div>
        </div>
    )
}
