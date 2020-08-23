import { useState, useEffect } from 'react';
import { ThemeContext } from '../context/site-context';
import Head from 'next/head';
import Header from './header';
import Footer from './footer';

export default function Layout({ children }) 
{
    const [theme, setTheme] = useState('light');

    useEffect(() =>
    {
        const initialTheme = localStorage.getItem('theme');
        if (initialTheme)
        {
            setTheme(initialTheme);
        }
    }, []);

    useEffect(() =>
    {
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            <div className={`theme-${theme}`}>
                <Head>
                    <link rel="apple-touch-icon" sizes="180x180" href="https://www.themoviedb.org/assets/2/apple-touch-icon-57ed4b3b0450fd5e9a0c20f34e814b82adaa1085c79bdde2f00ca8787b63d2c4.png"/>
                    <link rel="icon" type="image/png" sizes="32x32" href="https://www.themoviedb.org/assets/2/favicon-32x32-543a21832c8931d3494a68881f6afcafc58e96c5d324345377f3197a37b367b5.png"/>
                    <link rel="icon" type="image/png" sizes="16x16" href="https://www.themoviedb.org/assets/2/favicon-16x16-b362d267873ce9c5a39f686a11fe67fec2a72ed25fa8396c11b71aa43c938b11.png"/>
                    <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;700&display=swap" rel="stylesheet"/>
                </Head>
                <Header/>
                <main>
                    {children}
                </main>
                <Footer/>
            </div>
        </ThemeContext.Provider>
    );
}
