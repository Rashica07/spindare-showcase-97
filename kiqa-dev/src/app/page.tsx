import Image from "next/image";
import { pulse } from "../lib/novus";

export const revalidate = 0; // Force dynamic fetching for demo

export default async function Home() {
  let products: any[] = [];
  try {
    // Public read — this site is the 'kiqa-dev' tenant's frontend
    // (declared in package.json novusPulse.tenant); no auth token here.
    products = await pulse.getPublicProducts("kiqa-dev");
  } catch (error) {
    console.error("Failed to fetch products from backend", error);
  }

  return (
    <div className="min-h-screen bg-neutral-950 font-sans text-neutral-50 selection:bg-brand selection:text-black overflow-hidden relative">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-0 -left-1/4 w-[150%] h-[1000px] bg-gradient-to-br from-purple-600/20 via-transparent to-brand/10 blur-[150px] opacity-60 -z-10 animate-pulse-slow"></div>
      
      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] px-6 py-32 text-center animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 hover:bg-white/10 transition-colors cursor-pointer">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs font-medium tracking-wide text-neutral-300">Connected to Cloud Backend</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter max-w-4xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 leading-tight">
          Welcome to <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-purple-500">Kiqa Dev</span>
        </h1>
        
        <p className="mt-8 text-lg md:text-xl text-neutral-400 max-w-2xl font-light leading-relaxed">
          This is a fully dynamic Next.js storefront, fetching products and content in real-time from your highly scalable Novus Pulse cloud backend.
        </p>

        <div className="mt-12 flex gap-4">
          <button className="px-8 py-4 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
            Explore Products
          </button>
          <button className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 backdrop-blur-md transition-colors">
            View API Docs
          </button>
        </div>
      </main>

      {/* Dynamic Products Grid from SDK */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Live Products</h2>
            <p className="text-neutral-500 mt-2">Fetched dynamically from GCP.</p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-white/10 rounded-3xl bg-white/5 backdrop-blur-md">
            <p className="text-neutral-400">No products found in the database. Add some in your CMS!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="group relative rounded-3xl bg-neutral-900 border border-white/5 overflow-hidden hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
              >
                <div className="aspect-[4/3] bg-neutral-800 relative overflow-hidden">
                  {/* Image Placeholder - Would use product.images[0] */}
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900 group-hover:scale-105 transition-transform duration-700"></div>
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    ${product.price?.toFixed(2)}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{product.title}</h3>
                  <p className="text-sm text-neutral-400 line-clamp-2">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
