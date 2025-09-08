import { Header, Hero, Features, HowItWorks, CTA, Testimonials, Footer } from '../components/landing-page'

export default function Home() {
  return (
    <div className="font-sans min-h-screen bg-white text-foreground">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <CTA />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}