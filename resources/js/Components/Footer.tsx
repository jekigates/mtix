import { Link } from "@inertiajs/react";

export default function Footer() {
    return (
        <footer className="border-t bg-background p-4 z-50">
            <div className="text-sm mb-2">
                <Link
                    href="http://www.21cineplex.com/21profile"
                    className="hover:underline"
                >
                    Profile
                </Link>
                {" | "}
                <Link
                    href="http://www.21cineplex.com/termofuse"
                    className="hover:underline"
                >
                    Terms of Use
                </Link>
                {" | "}
                <Link
                    href="http://www.21cineplex.com/jobs"
                    className="hover:underline"
                >
                    Jobs Opportunities
                </Link>
                {" | "}
                <Link
                    href="http://www.21cineplex.com/credits"
                    className="hover:underline"
                >
                    Credit
                </Link>
                {" | "}
                <Link
                    href="http://www.21cineplex.com/page/page-info-iklan"
                    className="hover:underline"
                >
                    Info Iklan
                </Link>
                {" | "}
                <Link
                    href="http://www.21cineplex.com/sitemap"
                    className="hover:underline"
                >
                    Sitemap
                </Link>
            </div>

            <p className="text-xs">
                All materials and contents (text, graphics, and every
                attributes) of 21Cineplex or 21Cineplex.com website are
                copyrights and trademarks of 21Cineplex. No part of this website
                may be reproduced in any form without our written permission.
                Misuse of the entire content or any part, multiply, translate,
                use, or utilize it without written permission from 21Cineplex
                will be subject to criminal and / or civil penalties.
                <span className="text-background">admin@mtix-web-01</span>
            </p>
        </footer>
    );
}
