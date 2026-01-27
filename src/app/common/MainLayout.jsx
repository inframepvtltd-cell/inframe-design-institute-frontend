'use client'
import React from 'react'
import Header from './Header'
import FooterNew from './FooterNew'
import { Provider } from 'react-redux'
import myStore from '../redux/store'
import { usePathname } from 'next/navigation'

export default function MainLayout({ children }) {
    const pathname = usePathname();
    const hideFooter = pathname.includes('cart') || pathname.includes('study-materials/books/nift-nid-nata-uceed-study-material-books-in-india')
    const hideHeader = pathname.includes('study-materials/books/nift-nid-nata-uceed-study-material-books-in-india')

    return (
        <>
            <Provider store={myStore}>
                {!hideHeader && <Header />}
                {children}
                {!hideFooter && <FooterNew />}
            </Provider>
        </>
    )
}
