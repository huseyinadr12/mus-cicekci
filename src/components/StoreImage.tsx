import Image, { type ImageProps } from "next/image";
import { assetUrl } from "@/lib/deployment";

export default function StoreImage({ src, alt, ...props }: ImageProps) {
  return <Image {...props} alt={alt} src={typeof src === "string" ? assetUrl(src) : src} />;
}
