import { useState, PropsWithChildren, ReactNode } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import { User } from "@/types";
import TopBar from "@/Components/TopBar";
import Footer from "@/Components/Footer";

export default function Main({
    user,
    children,
}: PropsWithChildren<{ user?: User }>) {
    return (
        <>
            <TopBar user={user} />

            <main>{children}</main>

            <Footer />
        </>
    );
}
