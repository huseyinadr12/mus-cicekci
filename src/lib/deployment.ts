export const IS_PAGES_DEMO = process.env.NEXT_PUBLIC_PAGES_DEMO === "true";
export const BASE_PATH = IS_PAGES_DEMO ? "/mus-cicekci" : "";
export function assetUrl(src: string) {
  return src.startsWith("/") && !src.startsWith("//") && !src.startsWith(`${BASE_PATH}/`) ? `${BASE_PATH}${src}` : src;
}
