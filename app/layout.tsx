import type { Metadata } from "next";
import "./globals.css";
import { Rubik , Roboto } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const rubik = Rubik({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    variable: "--font-rubik",
});
const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    variable: "--font-roboto",
});

export const metadata: Metadata = {
    title: "UCSM FRESHERS WELCOME | 2025",
    description:
        "Fresher welcome voting web-application for University of computer studies, Mandalay",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${rubik.variable} ${roboto.variable} font-roboto font-normal antialiased`}
            >
                {children}
                <Toaster />
            </body>
        </html>
    );
}
