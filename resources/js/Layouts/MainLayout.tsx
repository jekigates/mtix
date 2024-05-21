import { PropsWithChildren } from "react"

import SideHeader from "@/Components/SideHeader"
import SideFooter from "@/Components/SiteFooter"
import { User } from "@/types"

export default function Main({
    user,
    children,
}: PropsWithChildren<{ user?: User }>) {
    return (
        <>
            <SideHeader user={user} />

            <main className="flex-1 relative">{children}</main>

            <SideFooter />
        </>
    )
}
