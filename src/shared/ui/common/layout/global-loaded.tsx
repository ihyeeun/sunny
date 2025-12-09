import sunnyLogo from "@/assets/sunny-transparency.png";
export default function GlobalLoaded() {
  return (
    <div
      className="flex w-screen flex-col items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <img className="h-10 animate-spin" src={sunnyLogo} aria-hidden="true" />
      <p className="animate-pulse">Loading ...</p>
    </div>
  );
}
