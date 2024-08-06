import React from "react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";

export function CreateLink() {
    return <div className="w-full h-full flex flex-wrap justify-between gap-y-2">
        <div className="w-full md:w-[49.75%] h-1/2 bg-[#121212] border border-white/[0.2] rounded-xl">
            <div className="min-w-[75px] w-[15%] h-[12%] flex justify-center items-center bg-[#161616] rounded-tl-xl border border-white/[0.2]">
                作成
            </div>
            <div className="w-full h-full flex flex-col py-5 px-2 gap-2">
                <Label htmlFor="redirect">リダイレクト先指定</Label>
                <Input id="redirect" placeholder="https://youtube.com" />
                <Button variant="outline">リンク作成</Button>
            </div>
        </div>
        <div className="w-full md:w-[49.75%] h-1/2 bg-[#121212] border border-white/[0.2] rounded-xl">
            <div className="min-w-[150px] w-[25%] md:w-[20%] h-[12%] flex justify-center items-center bg-[#161616] rounded-tl-xl border border-white/[0.2]">
                プレビュー偽造
            </div>
            <div className="w-full h-full flex flex-col py-5 px-2 gap-2">
                <Label htmlFor="copy">コピー元</Label>
                <Input id="copy" placeholder="https://youtube.com" />
            </div>
        </div>
    </div>
}
