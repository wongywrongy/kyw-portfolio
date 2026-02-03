import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/hero-section';
import { WorkSection } from '@/components/work-section';
import { ProjectsSection } from '@/components/projects-section';
import { MindspaceSection } from '@/components/mindspace-section';
import { getHomepageData } from '@/lib/sanity';

// Revalidate every hour (3600 seconds) - portfolio content doesn't change frequently
export const revalidate = 3600;

export default async function Home() {
  try {
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
  } catch (error) {
    console.error('Failed to load homepage data:', error);
    return (
      <>
        <Navigation />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-light mb-4">Unable to load content</h1>
            <p className="text-muted-foreground">Please try again later.</p>
          </div>
        </main>
      </>
    );
  }
}
