import dynamic from 'next/dynamic';
import Layout from '@/components/Layout';
import Hero from '@/components/sections/Hero';
import BeforeAfter from '@/components/sections/BeforeAfter';
import LookCollections from '@/components/sections/LookCollections';
import Process from '@/components/sections/Process';
import SoftwareCompatibility from '@/components/sections/SoftwareCompatibility';
import FAQ from '@/components/sections/FAQ';
import Footer from '@/components/sections/Footer';

// Dynamically import components that use browser APIs
const DynamicBeforeAfter = dynamic(() => import('@/components/sections/BeforeAfter'), { ssr: false });

export default function Home() {
  return (
    <Layout>
      <Hero />
      <DynamicBeforeAfter />
      <LookCollections />
      <Process />
      <SoftwareCompatibility />
      <FAQ />
      <Footer />
    </Layout>
  );
}
