import type { Metadata } from "next";
import { Lato } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import "./globals.css";

const lato = Lato({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "tomay.dev",
  description: "personal website of thomas yeung, usfca cs student",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${lato.className}`}>
              {/* Background */}

      {/* Body */}
      <div className="body">
        {children}
      </div>

      {/* Header */}
      {/* <div className={styles.header}>
        <div>
          updated 4/5
        </div>
      </div> */}

      {/* Footer */}
      <div className="footer">
        <div className="footer-left">Thomas Yeung</div>

        <div className="footer-right">
          <Link className="footer-link" href="https://github.com/tomayyeung" target="_blank">
            <Image className="footer-img" src="icons/github.svg" alt="Github" width={25} height={25} />
          </Link>

          <Link className="footer-link" href="https://www.linkedin.com/in/thomas-h-yeung/" target="_blank">
            <Image className="footer-img" src="icons/linkedin.svg" alt="LinkedIn" width={25} height={25} />
          </Link>

          <Link className="footer-link" href="https://leetcode.com/u/thyeung/" target="_blank">
            <Image className="footer-img" src="icons/leetcode.svg" alt="LeetCode" width={25} height={25} />
          </Link>
        </div>
      </div>
      </body>
    </html>
  );
}
