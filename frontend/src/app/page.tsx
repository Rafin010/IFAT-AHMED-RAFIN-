import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Projects from "@/components/home/Projects";

const API_URL = process.env.API_URL || 'http://127.0.0.1:8000/api/v1';

async function getPortfolioData() {
  try {
    const res = await fetch(`${API_URL}/portfolio/all`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function Home() {
  const data = await getPortfolioData();
  const profile = data?.profile || null;
  const projects = data?.projects || [];
  const skills = data?.skills || [];
  const certificates = data?.certificates || [];
  const experience = data?.experience || [];

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-background relative">
      <Navbar />
      <Hero profile={profile} />
      <Projects projects={projects} />
      {/* 
        <ExperienceSection />
        <ContactSection />
      */}
    </main>
  );
}
