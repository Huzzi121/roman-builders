import Footer from "@/components/Footer";
import { getPostData, getSortedPostsData } from '@/lib/markdown';
import CTASection from "@/components/CTASection";
import Link from 'next/link';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const postData = await getPostData(resolvedParams.slug);
  return {
    title: `${postData.title} | Roman Builders`,
  };
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const postData = await getPostData(resolvedParams.slug);

  return (
    <main className="pt-24 min-h-screen relative">
      <div className="fixed inset-0 z-[-1]">
        <div className="absolute inset-0 bg-[#ede9e0]"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-multiply"
          style={{ backgroundImage: "url('/images/projects-bg.png')" }}
        ></div>
      </div>

      <article className="py-20 px-6 sm:px-8 max-w-4xl mx-auto relative z-10">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-[#4a5240] mb-8 hover:text-[#2c3325] transition-colors">
          <i className="fa-solid fa-arrow-left"></i> Back to Blog
        </Link>
        
        <header className="mb-12">
          {postData.category && (
            <div className="text-[10px] font-bold tracking-[0.25em] text-[#4a5240] uppercase mb-4">
              {postData.category}
            </div>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#161f18] mb-6 leading-tight">
            {postData.title}
          </h1>
          <div className="text-gray-500 font-medium text-sm">
            {new Date(postData.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </header>

        {postData.image && (
          <div className="w-full h-[300px] sm:h-[400px] rounded-3xl overflow-hidden shadow-lg mb-12">
            <img src={postData.image} alt={postData.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div 
          className="prose prose-lg prose-headings:font-serif prose-headings:text-[#161f18] prose-p:text-gray-600 prose-a:text-[#4a5240] max-w-none"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>

      <CTASection />
      <Footer />
    </main>
  );
}
