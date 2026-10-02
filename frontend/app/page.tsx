import { Navigation } from '@/components/layout';
import { HeroSection, WorkSection, ProjectsSection } from '@/components/sections';
import { getHomepageData } from '@/lib/payload';

export const revalidate = 60;

export default async function Home() {
  try {
    const { hero, workExperiences, projects, siteSettings } = await getHomepageData();

    return (
      <>
        <Navigation />
        <main className="fade-in">
          <HeroSection data={hero} />

          {/* Padding outside, width cap inside — this is what makes the rule
              land on exactly the same edges as the hero and the columns at
              every viewport size. `mx-6` alone spanned the full viewport. */}
          <div className="px-6">
            <div className="max-w-[var(--w-wide)] mx-auto h-px bg-[var(--border)]" />
          </div>

          <div className="two-col max-w-[var(--w-wide)] mx-auto px-6">
            <div className="pr-0 md:pr-9">
              <WorkSection experiences={workExperiences} resumeUrl={siteSettings?.resumeUrl} />
            </div>
            <div className="pl-0 md:pl-9 border-t border-[var(--border)] md:border-t-0 pt-8 md:pt-0">
              <ProjectsSection projects={projects} />
            </div>
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
            <h1 className="font-[family-name:var(--font-display)] text-2xl font-light mb-4">Unable to load content</h1>
            <p className="text-[var(--text-secondary)]">Please try again later.</p>
          </div>
        </main>
      </>
    );
  }
}
