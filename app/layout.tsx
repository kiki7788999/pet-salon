import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {"title":"毛茸茸 PAW SPA — 把爱，揉进每一朵泡泡里","description":"毛茸茸宠物洗护，给每一位毛孩子温柔的洗澡与造型时光。","icons":{"icon":"/favicon.svg"}};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) { return <html lang="zh-CN"><body>{children}</body></html>; }
