import { BRAND } from "@/lib/brand";

export default function BrandSignature({ emblem = true }: { emblem?: boolean }) {
  return <span className="brand-signature">
    {emblem && <svg className="brand-emblem" viewBox="0 0 48 64" fill="none" aria-hidden="true"><path d="M24 60V29M24 35C8 33 5 19 9 9c10 1 15 8 15 20M24 35c16-2 19-16 15-26-10 1-15 8-15 20M24 29C14 20 17 9 24 3c7 6 10 17 0 26ZM24 49c-8 0-13-5-14-11 8 0 14 4 14 11ZM24 55c8 0 13-5 14-11-8 0-14 4-14 11Z" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /></svg>}
    <span className="brand-type"><span className="brand-name">{BRAND.name}</span><span className="brand-descriptor">{BRAND.descriptor}</span></span>
  </span>;
}
