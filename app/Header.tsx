import Link from "next/link";

export default function Header() {
  return (
    <div className="fixed top-0 left-0 w-full bg-slate-50 flex justify-start items-center p-3">
      <Link href={"/"}>
        <span className="text-xl font-bold">이</span>미지로{" "}
        <span className="text-xl font-bold">뿌</span>리 뽑는{" "}
        <span className="text-xl font-bold">영</span>단어
      </Link>
    </div>
  );
}
