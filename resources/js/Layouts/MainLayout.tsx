import { useState, PropsWithChildren, ReactNode } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import { User } from "@/types";
import SideHeader from "@/Components/SideHeader";
import SideFooter from "@/Components/SiteFooter";

export default function Main({
    user,
    children,
}: PropsWithChildren<{ user?: User }>) {
    return (
        <>
            <SideHeader user={user} />

            <main>{children}</main>

            <SideFooter />
        </>
    );
}
