import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
 title: 'Шери — UGC-экосистема для брендов',
 description: 'Шери организует UGC-проекты для брендов: обучает креаторов, выпускает обзоры и бренд-контент, публикует ролики на нескольких площадках и анализирует результаты.',
 icons: { icon: '/favicon.svg' },
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
 return <html lang="ru"><body>{children}</body></html>;
}
