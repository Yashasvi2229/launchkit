import Image from "next/image";

type DocImagePanelProps = {
  src: string;
  alt: string;
  title: string;
  caption: string;
  tone?: "default" | "blue";
};

export function DocImagePanel({
  src,
  alt,
  title,
  caption,
  tone = "default",
}: DocImagePanelProps) {
  const isBlue = tone === "blue";

  return (
    <figure
      className={`rounded-2xl border overflow-hidden ${
        isBlue
          ? "border-blue-500/30 bg-blue-950/20"
          : "border-white/10 bg-white/[0.02]"
      }`}
    >
      <div
        className={`px-4 py-3 border-b flex items-center ${
          isBlue ? "border-blue-500/30 bg-blue-500/10" : "border-white/10 bg-black/20"
        }`}
      >
        <span className={`text-[12px] font-medium ${isBlue ? "text-blue-200" : "text-zinc-300"}`}>
          {title}
        </span>
      </div>

      <div className="p-3">
        <div className={`rounded-xl overflow-hidden border ${isBlue ? "border-blue-400/30" : "border-white/10"}`}>
          <Image src={src} alt={alt} width={1600} height={1200} className="w-full h-auto" />
        </div>
      </div>

      <figcaption className={`px-4 pb-4 text-[13px] ${isBlue ? "text-blue-100/80" : "text-zinc-400"}`}>
        {caption}
      </figcaption>
    </figure>
  );
}
