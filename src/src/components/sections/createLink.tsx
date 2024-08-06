import React, { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch.tsx";
import { client } from "@/backend/client";

interface Config {
  redirect: string;
  fakePreview: boolean;
  fakePreviewContext: {
    title: string;
    description: string;
    image: string;
  };
  webhook: boolean;
  webhookURL: string;
}

export function CreateLink() {
  const [config, setConfig] = useState<Config>({
    redirect: "",
    fakePreview: false,
    fakePreviewContext: {
      title: "",
      description: "",
      image: "",
    },
    webhook: false,
    webhookURL: "",
  });

  return (
    <div className="w-full h-full md:min-h-[90vh] flex flex-wrap justify-between gap-y-2 p-2">
      <Create config={config} setConfig={setConfig} />
      <Preview config={config} setConfig={setConfig} />
      <Webhook config={config} setConfig={setConfig} />
    </div>
  );
}

const Create = (
  { config, setConfig }: {
    config: Config;
    setConfig: React.Dispatch<React.SetStateAction<Config>>;
  },
) => {
  const { toast } = useToast();

  return (
    <div className="w-full md:w-[49.75%] h-3/5 bg-[#121212] border border-white/[0.2] rounded-xl">
      <div className="min-w-[75px] w-[15%] h-[12%] flex justify-center items-center bg-[#161616] rounded-tl-xl border border-white/[0.2]">
        作成
      </div>
      <div className="w-full h-full flex flex-col py-5 px-2 gap-2">
        <Label htmlFor="redirect">リダイレクト先指定</Label>
        <Input
          id="redirect"
          value={config.redirect}
          onChange={(e) =>
            // deno-lint-ignore no-explicit-any
            setConfig({ ...config, redirect: (e.target as any).value })}
          placeholder="https://youtube.com"
        />
        <div className="w-full flex gap-x-2 items-center">
          <div className="w-full flex gap-x-2 items-center">
            <Switch
              id="fake-preview"
              checked={config.fakePreview}
              onCheckedChange={() =>
                setConfig({ ...config, fakePreview: !config.fakePreview })}
            />
            <Label htmlFor="fake-preview pb-1">プレビュー偽造</Label>
          </div>
          <div className="w-full flex gap-x-2 items-center">
            <Switch
              id="webhook"
              checked={config.webhook}
              onCheckedChange={() => {
                if (WEBHOOK_REGEX.test(config.webhookURL) || config.webhook ) {
                  setConfig({ ...config, webhook: !config.webhook })
                }else{
                  toast({
                    title: "エラー",
                    description: "WebhookのURLを正しく入力してください",
                  })
                }
              }}
            />
            <Label htmlFor="webhook pb-1">Webhook連携</Label>
          </div>
        </div>
        <Button variant="outline">リンク作成</Button>
      </div>
    </div>
  );
};

const Preview = (
  { config, setConfig }: {
    config: Config;
    setConfig: React.Dispatch<React.SetStateAction<Config>>;
  },
) => {
  const { toast } = useToast();
  const [copyTargetUrl, setCopyTargetUrl] = useState("");

  const copyPreview = async () => {
    toast({
      title: "コピー中",
      description: "プレビューをコピーしています。",
    });

    const response = await client.api.ogp.$get({
      query: {
        url: copyTargetUrl,
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      toast({
        title: "成功",
        description: "適用しました。",
      });
      setConfig({
        ...config,
        fakePreviewContext: {
          title: data.title,
          description: data.description,
          image: data.image,
        },
      });
    } else if (response.status === 400) {
      toast({
        title: "失敗",
        description: (await response.json()).error,
      });
    }
  };

  return (
    <div className="w-full md:w-[49.75%] h-3/5 bg-[#121212] border border-white/[0.2] rounded-xl">
      <div className="min-w-[150px] w-[25%] md:w-[20%] h-[12%] flex justify-center items-center bg-[#161616] rounded-tl-xl border border-white/[0.2]">
        プレビュー偽造
      </div>
      <div className="w-full h-full flex flex-col py-5 px-2 gap-2">
        <div className="w-full flex gap-x-2">
          <div className="w-1/2 flex flex-col gap-y-1">
            <Label htmlFor="title">タイトル</Label>
            <Input
              id="title"
              value={config.fakePreviewContext.title}
              onChange={(e) =>
                setConfig({
                  ...config,
                  fakePreviewContext: {
                    ...config.fakePreviewContext,
                    // deno-lint-ignore no-explicit-any
                    title: (e.target as any).value,
                  },
                })}
              placeholder="YouTube"
            />
          </div>
          <div className="w-1/2 flex flex-col gap-y-1">
            <Label htmlFor="desc">説明</Label>
            <Input
              id="desc"
              value={config.fakePreviewContext.description}
              onChange={(e) => {
                setConfig({
                  ...config,
                  fakePreviewContext: {
                    ...config.fakePreviewContext,
                    // deno-lint-ignore no-explicit-any
                    description: (e.target as any).value,
                  },
                });
              }}
              placeholder="YouTube でお気に入りの動画や音楽を楽しもう。"
            />
          </div>
        </div>
        <Label htmlFor="image">画像リンク</Label>
        <Input
          id="image"
          value={config.fakePreviewContext.image}
          onChange={(e) => {
            setConfig({
              ...config,
              fakePreviewContext: {
                ...config.fakePreviewContext,
                // deno-lint-ignore no-explicit-any
                image: (e.target as any).value,
              },
            });
          }}
          placeholder="https://www.youtube.com/img/desktop/yt_1200.png"
        />
        <Label htmlFor="copy">コピー元</Label>
        <div className="w-full flex gap-x-2">
          <Input
            id="copy"
            value={copyTargetUrl}
            // deno-lint-ignore no-explicit-any
            onChange={(e) => setCopyTargetUrl((e.target as any).value)}
            placeholder="https://youtube.com"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                copyPreview();
              }
            }}
          />
          <Button variant="outline" onClick={() => copyPreview()}>
            コピー
          </Button>
        </div>
      </div>
    </div>
  );
};

const WEBHOOK_REGEX =
  /https?:\/\/.+\..+/;

const Webhook = (
  { config, setConfig }: {
    config: Config;
    setConfig: React.Dispatch<React.SetStateAction<Config>>;
  },
) => {
  return (
    <div className="w-full md:w-[49.75%] h-2/5 bg-[#121212] border border-white/[0.2] rounded-xl">
      <div className="min-w-[150px] w-[15%] md:w-[17.5%] h-[18%] flex justify-center items-center bg-[#161616] rounded-tl-xl border border-white/[0.2]">
        Webhook
      </div>
      <div className="w-full h-full flex flex-col py-5 px-2 gap-2">
        <Label htmlFor="webhook-url">Webhook</Label>
        <Input
          id="webhook-url"
          value={config.webhookURL}
          onChange={(e) =>
            // deno-lint-ignore no-explicit-any
            setConfig({ ...config, webhookURL: (e.target as any).value })}
          placeholder="https://discord.com/api/webhooks/..."
          className={WEBHOOK_REGEX.test(config.webhookURL)
            ? "text-green-500"
            : "text-red-500"}
        />
        <div className="w-full flex flex-col gap-y-1 bg-[#121212] border border-white/[0.2] rounded-md m-1 py-1 px-3 font-regular text-sm">
          {"POST / { content: 'this is result.' }"}
        </div>
      </div>
    </div>
  );
};
