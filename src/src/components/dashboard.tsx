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
import { createToken } from "@/lib/createToken.ts";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";

export function Dashboard() {
  const [open, setOpen] = useState(false);
  const [loggeedLabel, setLoggeedLabel] = useState<number>(0);

  useEffect(() => {
    if (localStorage.getItem("token")) {
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
      <DashboardContainer />
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
        href={"/"}
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
          作成履歴
        </motion.span>
      </a>
      {logged !== 1 && <CreateAccount open={open} setOpen={setOpen} />}
      {logged !== 1 && <Login open={open} setOpen={setOpen} />}
      {logged !== 2 && <Logout open={open} setOpen={setOpen} />}
    </>
  );
};

const CreateAccount = (
  { open, setOpen }: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  },
) => {
  const [token, setToken] = useState("");

  return (
    <Dialog>
      <DialogTrigger
        onClick={() => {
          const createdToken = createToken();
          localStorage.setItem("token", createdToken);
          setToken(createdToken);
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
            アカウント作成
          </motion.span>
        </button>
      </DialogTrigger>
      <DialogContent onClose={() => setOpen(false)}>
        <DialogHeader>
          <DialogTitle>アカウント作成完了</DialogTitle>
          <DialogDescription className="flex flex-col gap-2">
            <p>Token: {token} (保管してください)</p>
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
  const [token, setToken] = useState("");

  console.log(token)

  return (
    <Dialog>
      <DialogTrigger>
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
              過去に保管したトークンを入力してください。
            </p>
            <Input placeholder="abcde12345..." pattern="^[a-f0-9]{0,32}$" value={token} onChange={(e) => setToken((e.target as HTMLInputElement).value.trim().replace(/[^a-f0-9]/g, ""))} />
            <DialogPrimitive.Close asChild>
              <Button
                variant="outline"
                disabled={token.length !== 32}
                onClick={() => {
                  localStorage.setItem("token", token);
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
              Tokenを保管していない場合、永久にログイン出来なくなります。
              それでもログアウトしますか？
            </p>
            <DialogPrimitive.Close asChild>
              <Button
                variant="outline"
                onClick={() => {
                  localStorage.removeItem("token");
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
        住所特定ツール v3
      </span>
    </a>
  );
};

const DashboardContainer = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 ounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <div className="flex gap-2">
          {[...new Array(4)].map((_, i) => (
            <div
              key={"first" + i}
              className="h-20 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
            >
            </div>
          ))}
        </div>
        <div className="flex gap-2 flex-1">
          {[...new Array(2)].map((_, i) => (
            <div
              key={"second" + i}
              className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
            >
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
