"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      alt="logo"
      className="hidden h-auto w-auto cursor-pointer md:block"
      height="100"
      width="100"
      src="/images/logo.png"
      priority
    />
  );
};

export default Logo;
