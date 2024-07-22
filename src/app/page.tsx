import AcmeLogo from "@/app/ui/acme-logo";
import styles from "@/app/ui/home.module.css";
import Link from "next/link";
import Image from "next/image";
export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className={styles.shape} />
      <div className="flex h-10 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-36">
        <AcmeLogo />
      </div>
      <div className="mt-3 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/4 md:px-20">
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
