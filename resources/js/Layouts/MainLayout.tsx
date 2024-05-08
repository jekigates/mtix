import { PropsWithChildren } from "react";
import { User } from "@/types";
import SideHeader from "@/Components/SideHeader";
import SideFooter from "@/Components/SiteFooter";

export default function Main({
    user,
    city,
    children,
}: PropsWithChildren<{ user?: User; city?: App.Data.CityData }>) {
    return (
        <>
            <SideHeader user={user} />

            <main className="flex-1 relative">{children}</main>

            <SideFooter />
        </>
    );
}
