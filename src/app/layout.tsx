import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
import MuiProvider from "./mui-provider"; // клиентский провайдер

export const metadata: Metadata = {
    title: "Star Wars App",
    description: "SPA на Next.js + MUI + SWAPI",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
        <body>
        <MuiProvider>{children}</MuiProvider>
        </body>
        </html>
    );
}
