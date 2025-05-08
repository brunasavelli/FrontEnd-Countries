import "./globals.css";
import { Roboto } from "next/font/google";
import React from "react";

const font = Roboto ({
    variable: "--font",
    subsets: ["latin"],
});

export const metadata = {
    title: "Countries",
    icons: {
    icon: "/icons/favicon.ico",
},
    description: "Projeto pra mostrar países",

};

export default function RootLayout({ children }) {
    return (
        <html>
            <body className={font.variable}>{children}</body>
        </html>
    );
}
