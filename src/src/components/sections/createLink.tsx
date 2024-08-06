import React, { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { useToast } from "@/components/ui/use-toast"
import { Switch } from "@/components/ui/switch.tsx";

interface Config {
    redirect: string;
    fakePreview: boolean;
    fakePreviewContext: {
        title: string;
        description: string;
        icon: string;
    };
}

export function CreateLink() {
  const [config, setConfig] = useState<Config>({
    redirect: "",
    fakePreview: false,
    fakePreviewContext: {
      title: "",
      description: "",
      icon: "",
    }
  })

  return (
    <div className="w-full h-full md:min-h-screen flex flex-wrap justify-between gap-y-2">
      <Create config={config} setConfig={setConfig} />
      <Preview config={config} setConfig={setConfig} />
    </div>
  );
}

const Create = ({ config, setConfig }: { config: Config, setConfig: React.Dispatch<React.SetStateAction<Config>> }) => {
    return <div className="w-full md:w-[49.75%] h-1/2 bg-[#121212] border border-white/[0.2] rounded-xl">
    <div className="min-w-[75px] w-[15%] h-[12%] flex justify-center items-center bg-[#161616] rounded-tl-xl border border-white/[0.2]">
      作成
    </div>
    <div className="w-full h-full flex flex-col py-5 px-2 gap-2">
      <Label htmlFor="redirect">リダイレクト先指定</Label>
      <Input id="redirect" placeholder="https://youtube.com" />
      <div className="w-full flex gap-x-2 items-center pb-1">
        <Switch id="fake-preview" checked={config.fakePreview} onCheckedChange={() => setConfig({ ...config, fakePreview: !config.fakePreview })} />
        <Label htmlFor="fake-preview">プレビュー偽造</Label>
      </div>
      <Button variant="outline">リンク作成</Button>
    </div>
  </div>
}

const Preview = ({ config, setConfig }: { config: Config, setConfig: React.Dispatch<React.SetStateAction<Config>> }) => {
    return <div className="w-full md:w-[49.75%] h-1/2 bg-[#121212] border border-white/[0.2] rounded-xl">
    <div className="min-w-[150px] w-[25%] md:w-[20%] h-[12%] flex justify-center items-center bg-[#161616] rounded-tl-xl border border-white/[0.2]">
      プレビュー偽造
    </div>
    <div className="w-full h-full flex flex-col py-5 px-2 gap-2">
      <div className="w-full flex gap-x-2">
        <div className="w-1/2 flex flex-col gap-y-1">
          <Label htmlFor="title">タイトル</Label>
          <Input id="title" placeholder="PayPay 受け取り依頼" />
        </div>
        <div className="w-1/2 flex flex-col gap-y-1">
          <Label htmlFor="desc">説明</Label>
          <Input
            id="desc"
            placeholder="PayPay 受け取り依頼が届きました。"
          />
        </div>
      </div>
      <Label htmlFor="image">画像リンク</Label>
      <Input id="image" placeholder="https://www.youtube.com/img/desktop/yt_1200.png" />
      <Label htmlFor="copy">コピー元</Label>
      <div className="w-full flex gap-x-2">
        <Input id="copy" placeholder="https://youtube.com" />
        <Button variant="outline">コピー</Button>
      </div>
    </div>
  </div>
}
