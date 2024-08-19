/**
 * Server Component
 * fetch, secure data, cookie, header 등 사용
 */

import "./globals.css";
import Link from "next/link";
import {Control} from "./Control";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const res = await fetch(process.env.API_URL+'/topics',{cache:'no-store'});
  const topics = await res.json();
  return (
    <html>     
      <body>
      <h1><Link href="/">WEB</Link></h1>
      <ol>
          {topics.map((topic)=>{
            return <li key={topic.id}><Link href={`/read/${topic.id}`}>{topic.title}</Link></li>
          })}
      </ol>
      {children}
        <Control/>
      </body>
    </html>
  );
}
