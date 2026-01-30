import Header from "@/components/Header";
import Hero from "@/page/Home/Hero";
import BrandSlider from "@/components/BrandSlider";
import Footer from "@/components/Footer";
import BrandStory from "@/page/Home/BrandStory";
import ProductShowcase from "@/page/Home/ProductShowcase";
import Features from "@/page/Home/Features";
import Testimonial from "@/page/Home/Testimonial";

export default function Home() {
  return (
    <main>
      <Header />
        <Hero />
        <BrandSlider />
        <Features />
        <ProductShowcase />
        <BrandStory />
        <Testimonial />
      <Footer />
    </main>
  );
}
