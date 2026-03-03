import { PortfolioShell } from "@/components/portfolio-shell"
import { HeroSection } from "@/components/hero-section"
import { MetricsBanner } from "@/components/metrics-banner"
import { ProceduralToAgentic } from "@/components/procedural-to-agentic"
import { SkillsSection } from "@/components/skills-section"
import { FeaturedProjects } from "@/components/featured-projects"
import { ContactCTA } from "@/components/contact-cta"

export default function Page() {
  return (
    <PortfolioShell>
      <HeroSection />
      <MetricsBanner />
      <ProceduralToAgentic />
      <SkillsSection />
      <FeaturedProjects />
      <ContactCTA />
    </PortfolioShell>
  )
}
