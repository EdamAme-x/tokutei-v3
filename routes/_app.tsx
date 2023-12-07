import { AppProps } from "$fresh/server.ts";
import { JSXSEO } from "https://deno.land/x/jsx_seo@stable/seo.tsx";

export default function App({ Component }: AppProps) {
  return (
    <html>
      <head lang="ja">
        <JSXSEO
          title="住所特定ツール　v3"
          description="次世代型住所特定ツール"
          icon="/logo.svg"
          url="https://tokutei.deno.dev"
          ogp={{
            type: "website"
          }}
        />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}