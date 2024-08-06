import { z } from "zod";

export const ConfigSchema = z.object({
    redirect: z.string({
        message: "リダイレクト先を指定してください。",
    }).url({
        message: "正しいURLを指定してください。",
    }),
    fakePreview: z.boolean({
        message: "プレビューを偽造するかどうかを指定してください。",
    }),
    fakePreviewContext: z.object({
        title: z.string({
            message: "タイトルを指定してください。",
        }),
        description: z.string({
            message: "説明文を指定してください。"
        }),
        image: z.string({
            message: "画像のURLを指定してください。",
        })
    }),
    webhook: z.boolean({
        message: "Webhookを使用するかどうかを指定してください。"
    }),
    webhookURL: z.string({
        message: "WebhookのURLを指定してください。"
    }),
    key: z.string({
        message: "鍵を指定してください。",
    }),
});