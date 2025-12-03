import sunnyLogo from "@/assets/sunny-transparency.png";
export default function GlobalLoaded() {
  return (
    <div className="flex w-screen flex-col items-center justify-center">
      <img
        className="h-10 animate-spin"
        src={sunnyLogo}
        alt="sunny 로고가 회전하며 로딩 중입니다."
      />
      <p className="animate-pulse">Loading ...</p>
    </div>
  );
}
