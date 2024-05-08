import { Separator } from "./ui/separator";

export default function SiteFooter() {
    return (
        <footer className="border-t text-muted-foreground p-4 bg-background">
            <div className="mb-2 flex h-4 items-center space-x-2 text-xs">
                <a
                    href="http://www.21cineplex.com/21profile"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium transition-colors hover:text-foreground hover:underline underline-offset-4"
                >
                    Profile
                </a>

                <Separator orientation="vertical" />

                <a
                    href="http://www.21cineplex.com/termofuse"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium transition-colors hover:text-foreground hover:underline underline-offset-4"
                >
                    Terms of Use
                </a>

                <Separator orientation="vertical" />

                <a
                    href="http://www.21cineplex.com/jobs"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium transition-colors hover:text-foreground hover:underline underline-offset-4"
                >
                    Jobs Opportunities
                </a>

                <Separator orientation="vertical" />

                <a
                    href="http://www.21cineplex.com/credits"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium transition-colors hover:text-foreground hover:underline underline-offset-4"
                >
                    Credit
                </a>

                <Separator orientation="vertical" />

                <a
                    href="http://www.21cineplex.com/page/page-info-iklan"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium transition-colors hover:text-foreground hover:underline underline-offset-4"
                >
                    Info Iklan
                </a>

                <Separator orientation="vertical" />

                <a
                    href="http://www.21cineplex.com/sitemap"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium transition-colors hover:text-foreground hover:underline underline-offset-4"
                >
                    Sitemap
                </a>
            </div>

            <p className="text-[10px]">
                All materials and contents (text, graphics, and every
                attributes) of 21Cineplex or 21Cineplex.com website are
                copyrights and trademarks of 21Cineplex. No part of this website
                may be reproduced in any form without our written permission.
                Misuse of the entire content or any part, multiply, translate,
                use, or utilize it without written permission from 21Cineplex
                will be subject to criminal and / or civil penalties.{" "}
                <span className="text-white">admin@mtix-web-01</span>
            </p>
        </footer>
    );
}
