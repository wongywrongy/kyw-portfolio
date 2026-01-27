import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/hero-section';
import { WorkSection } from '@/components/work-section';
import { ProjectsSection } from '@/components/projects-section';
import { MindspaceSection } from '@/components/mindspace-section';
import { getHomepageData } from '@/lib/sanity';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const { hero, workExperiences, projects, blogPosts } = await getHomepageData();

  return (
    <>
      <Navigation />
      <main className="min-h-screen snap-y snap-mandatory overflow-y-scroll h-screen">
        <div className="snap-start">
          <HeroSection data={hero} />
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:snap-start">
          <div className="snap-start lg:snap-align-none">
            <WorkSection experiences={workExperiences} />
          </div>
          <div className="snap-start lg:snap-align-none">
            <ProjectsSection projects={projects} />
          </div>
        </div>

        <div className="snap-start">
          <MindspaceSection posts={blogPosts} />
        </div>
      </main>
    </>
  );
}
