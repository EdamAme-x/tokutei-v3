import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  CheckIcon,
  History,
  LoaderIcon,
  LogIn,
  LogOut,
  Pickaxe,
  Settings2,
  ShieldQuestionIcon,
  UserRoundPlus,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { createKey } from "@/lib/createKey";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Toaster } from "@/components/ui/toaster.tsx"

export function Dashboard({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [loggeedLabel, setLoggeedLabel] = useState<number>(0);

  useEffect(() => {
    if (localStorage.getItem("key")) {
      setLoggeedLabel(1);
    } else {
      setLoggeedLabel(2);
    }
  }, [open]);

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen",
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={true}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <>
              <Logo />
            </>
            <div
              className={"mt-8 flex flex-col items-center gap-2"}
            >
              <SidebarLinks
                setOpen={setOpen}
                open={open}
                logged={loggeedLabel}
              />
            </div>
          </div>
          <div className="font-regular text-sm text-neutral-500 flex justify-center items-center gap-2">
            {loggeedLabel === 0
              ? (
                <LoaderIcon
                  width={24}
                  height={24}
                  className="animate-spin"
                />
              )
              : loggeedLabel === 1
              ? <CheckIcon width={24} height={24} />
              : <ShieldQuestionIcon width={24} height={24} />}
            {open && (
              <motion.span
                initial={{ display: "none" }}
                animate={{ display: "block" }}
                transition={{ delay: 0.1 }}
              >
                {loggeedLabel === 0
                  ? ""
                  : loggeedLabel === 1
                  ? "ログイン済み"
                  : "匿名ユーザー"}
              </motion.span>
            )}
          </div>
        </SidebarBody>
      </Sidebar>
      <DashboardContainer>
        {children}
      </DashboardContainer>
      <Toaster />
    </div>
  );
}

const SidebarLinks = (
  { open, logged, setOpen }: {
    open: boolean;
    logged: number;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  },
) => {
  return (
    <>
      <a
        href={"/create"}
        className={cn(
          "flex items-center justify-start gap-2  group/sidebar py-2",
        )}
      >
        <Pickaxe className="text-neutral-900 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />
        <motion.span
          animate={{
            display: open ? "inline-block" : "none",
          }}
          transition={{ duration: 0 }}
          className="text-neutral-700 dark:text-neutral-200 text-md group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
        >
          リンク作成
        </motion.span>
      </a>
      <a
        href={"/"}
        className={cn(
          "flex items-center justify-start gap-2  group/sidebar py-2",
        )}
      >
        <History className="text-neutral-900 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />
        <motion.span
          animate={{
            display: open ? "inline-block" : "none",
          }}
          transition={{ duration: 0 }}
          className="text-neutral-700 dark:text-neutral-200 text-md group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
        >
          リンク一覧
        </motion.span>
      </a>
      {logged !== 1 && <CreateAccount open={open} setOpen={setOpen} />}
      {logged !== 1 && <Login open={open} setOpen={setOpen} />}
      {logged !== 2 && <Logout open={open} setOpen={setOpen} />}
      {logged !== 2 && (
        <Setting
          open={open}
          setOpen={setOpen}
          logged={logged}
        />
      )}
    </>
  );
};

const CreateAccount = (
  { open, setOpen }: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  },
) => {
  const [_, setKey] = useState("");

  return (
    <Dialog>
      <DialogTrigger
        onClick={() => {
          const createdKey = createKey();
          localStorage.setItem("key", createdKey);
          setKey(createdKey);
          if (isNoDialog()) {
            window.alert("新規登録完了\n鍵は設定から確認できます。");
            setOpen(false);
          }
        }}
      >
        <button
          className={cn(
            "flex items-center justify-start gap-2  group/sidebar py-2",
          )}
        >
          <UserRoundPlus className="text-neutral-900 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />
          <motion.span
            animate={{
              display: open ? "inline-block" : "none",
            }}
            transition={{ duration: 0 }}
            className="text-neutral-700 dark:text-neutral-200 text-md group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
          >
            新規登録
          </motion.span>
        </button>
      </DialogTrigger>
      <DialogContent onClose={() => setOpen(false)}>
        <DialogHeader>
          <DialogTitle>新規登録完了</DialogTitle>
          <DialogDescription className="flex flex-col gap-2">
            <p>登録しました。鍵は設定から確認できます。</p>
            <DialogPrimitive.Close asChild>
              <Button
                onClick={() => {
                  setOpen(false);
                }}
                variant="outline"
              >
                完了
              </Button>
            </DialogPrimitive.Close>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

const Login = (
  { open, setOpen }: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  },
) => {
  const [key, setKey] = useState("");

  return (
    <Dialog>
      <DialogTrigger
        onClick={() => {
          if (isNoDialog()) {
            const key = window.prompt("鍵を入力してください");
            if (key && /^[a-z0-9]{32}$/.test(key)) {
              localStorage.setItem("key", key);
            } else {
              window.alert("正しい鍵を入力してください");
            }
            setOpen(false);
          }
        }}
      >
        <button
          className={cn(
            "flex items-center justify-start gap-2  group/sidebar py-2",
          )}
        >
          <LogIn className="text-neutral-900 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />
          <motion.span
            animate={{
              display: open ? "inline-block" : "none",
            }}
            transition={{ duration: 0 }}
            className="text-neutral-700 dark:text-neutral-200 text-md group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
          >
            ログイン
          </motion.span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ログイン</DialogTitle>
          <DialogDescription className="flex flex-col gap-3">
            <p>
              保管した鍵を入力してください。
            </p>
            <Input
              placeholder="abcde12345..."
              pattern="^[a-f0-9]{0,32}$"
              value={key}
              onChange={(e) =>
                setKey(
                  // deno-lint-ignore no-explicit-any
                  (e.target as any).value.trim().replace(
                    /[^a-f0-9]/g,
                    "",
                  ),
                )}
            />
            <DialogPrimitive.Close asChild>
              <Button
                variant="outline"
                disabled={key.length !== 32}
                onClick={() => {
                  localStorage.setItem("key", key);
                  setOpen(false);
                }}
              >
                ログイン
              </Button>
            </DialogPrimitive.Close>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

const Logout = (
  { open, setOpen }: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  },
) => {
  return (
    <Dialog>
      <DialogTrigger
        onClick={() => {
          if (isNoDialog()) {
            const confirm = window.confirm("ログアウトしますか？");
            if (confirm) {
              localStorage.removeItem("key");
              setOpen(false);
            }
          }
        }}
      >
        <button
          className={cn(
            "flex items-center justify-start gap-2  group/sidebar py-2",
          )}
        >
          <LogOut className="text-neutral-900 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />
          <motion.span
            animate={{
              display: open ? "inline-block" : "none",
            }}
            transition={{ duration: 0 }}
            className="text-neutral-700 dark:text-neutral-200 text-md group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
          >
            ログアウト
          </motion.span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ログアウト確認</DialogTitle>
          <DialogDescription className="flex flex-col gap-3">
            <p>
              鍵を保管していない場合、永久にログイン出来なくなります。
              それでもログアウトしますか？
            </p>
            <DialogPrimitive.Close asChild>
              <Button
                variant="outline"
                onClick={() => {
                  localStorage.removeItem("key");
                  setOpen(false);
                }}
              >
                はい
              </Button>
            </DialogPrimitive.Close>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

const Setting = (
  { open, setOpen, logged }: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    logged: number;
  },
) => {
  return (
    <Dialog>
      <DialogTrigger
        onClick={() => {
          if (isNoDialog()) {
            alert(
              `鍵: ${localStorage.getItem("key") || "ログインしていません"}`,
            );
          }
        }}
      >
        <button
          className={cn(
            "flex items-center justify-start gap-2  group/sidebar py-2",
          )}
        >
          <Settings2 className="text-neutral-900 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />
          <motion.span
            animate={{
              display: open ? "inline-block" : "none",
            }}
            transition={{ duration: 0 }}
            className="text-neutral-700 dark:text-neutral-200 text-md group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
          >
            設定
          </motion.span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>設定</DialogTitle>
          <DialogDescription className="flex flex-col gap-3">
            <p>
              鍵: {logged === 1
                ? localStorage.getItem("key")
                : "ログインしていません。"}
            </p>
            <DialogPrimitive.Close asChild>
              <Button
                variant="outline"
                onClick={() => {
                  setOpen(false);
                }}
              >
                はい
              </Button>
            </DialogPrimitive.Close>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export const Logo = () => {
  return (
    <a
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <img src="/favicon.png" className="h-6 w-6" alt="Logo" />
      <span className="font-medium text-black dark:text-white whitespace-pre">
        位置情報特定ツール v3
      </span>
    </a>
  );
};

const DashboardContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-1">
      <div className="p-2 ounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full min-h-screen overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

function isNoDialog() {
  // @ts-expect-error: NOT TYPE WELL
  return window.innerWidth < 764;
}
