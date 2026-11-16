import type { Metadata } from "next";
import "./illustrated.css";
export const metadata: Metadata = { title: "王明浩 | AI 产品经理 · 金融数据分析", description: "在数据与算法之间，构建懂金融的 AI 产品。", openGraph: { title: "王明浩 | AI 产品经理", description: "在数据与算法之间，构建懂金融的 AI 产品。", type: "website" } };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="zh-CN"><body>{children}</body></html>; }
