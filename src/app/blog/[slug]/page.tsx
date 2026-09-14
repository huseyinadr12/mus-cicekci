import { BLOG_POSTS } from "@/lib/constants";
import { ArrowLeft,Calendar,Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Yazı Bulunamadı | Muş Çiçekçi" };
  }

  return {
    title: `${post.title} | Muş Çiçekçi Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="py-16 bg-[#F8F5EF] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold text-[#18392B] hover:text-[#365B45]"
        >
          <ArrowLeft className="w-4 h-4" />
          Ana Sayfaya Dön
        </Link>

        {/* Article Header */}
        <header className="space-y-4">
          <div className="flex items-center gap-3 text-xs text-[#575A53]">
            <span className="px-3 py-1 rounded-full bg-[#18392B]/10 text-[#18392B] font-bold">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#18392B] leading-tight">
            {post.title}
          </h1>

          <p className="text-sm sm:text-base text-[#575A53] leading-relaxed italic border-l-2 border-[#6F2232] pl-4">
            {post.excerpt}
          </p>
        </header>

        {/* Hero Image */}
        <div className="relative aspect-16/9 rounded-3xl overflow-hidden shadow-md">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content Body */}
        <div className="bg-[#FFFDFC] p-8 sm:p-12 rounded-3xl border border-[#A9B8A5]/25 shadow-xs space-y-6 text-sm text-[#20221F] leading-relaxed whitespace-pre-line">
          {post.content}
        </div>

        {/* Author & CTA */}
        <footer className="p-6 rounded-2xl bg-[#18392B] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] text-[#A9B8A5] block">Yazar</span>
            <h4 className="font-serif text-lg font-bold">{post.author}</h4>
            <p className="text-xs text-[#A9B8A5] mt-0.5">
              Taşdemir Çiçekçilik Botanik ve Düzenleme Uzmanı
            </p>
          </div>

          <Link
            href="/cicekler"
            className="px-6 py-3 rounded-full bg-[#F8F5EF] hover:bg-white text-[#18392B] text-xs font-bold uppercase tracking-widest transition-all self-start sm:self-center"
          >
            Taze Çiçekleri İncele
          </Link>
        </footer>
      </div>
    </article>
  );
}
