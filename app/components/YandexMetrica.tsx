'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

function MetricaContent() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const YANDEX_ID = process.env.NEXT_PUBLIC_YANDEX_METRICA_ID;

    useEffect(() => {
        // Manually hit the counter on route changes if needed by Yandex Metrica's SPA support.
        // However, the 'trackLinks:true' and 'url: location.href' in init might handle it.
    }, [pathname, searchParams]);

    if (!YANDEX_ID) return null;

    return (
        <>
            <Script id="yandex-metrika" strategy="afterInteractive">
                {`
          (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_ID}', 'ym');

          ym(${YANDEX_ID}, 'init', {
            ssr: true,
            webvisor: true,
            clickmap: true,
            ecommerce: "dataLayer",
            referrer: document.referrer,
            url: location.href,
            accurateTrackBounce: true,
            trackLinks: true
          });
        `}
            </Script>
            <noscript>
                <div>
                    <img
                        src={`https://mc.yandex.ru/watch/${YANDEX_ID}`}
                        style={{ position: 'absolute', left: '-9999px' }}
                        alt=""
                    />
                </div>
            </noscript>
        </>
    );
}

export default function YandexMetrica() {
    return (
        <Suspense fallback={null}>
            <MetricaContent />
        </Suspense>
    );
}
