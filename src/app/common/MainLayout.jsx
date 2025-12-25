'use client'
import React from 'react'
import Header from './Header'
import FooterNew from './FooterNew'
import { Provider } from 'react-redux'
import myStore from '../redux/store'
import { usePathname } from 'next/navigation'

export default function MainLayout({ children }) {
    const pathname = usePathname();
    const hideFooter = pathname.includes('checkout');

    return (
        <>
            <Provider store={myStore}>
                <Header />
                {children}
                {!hideFooter && <FooterNew />}
            </Provider>
        </>
    )
}
