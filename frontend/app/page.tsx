import { PortfolioShell } from "@/components/portfolio-shell"
import { HeroSection } from "@/components/hero-section"
import { SkillsSection } from "@/components/skills-section"
import { FeaturedProjects } from "@/components/featured-projects"
import { ContactCTA } from "@/components/contact-cta"

export default function Page() {
  return (
    <PortfolioShell>
      <HeroSection />
      <SkillsSection />
      <FeaturedProjects />
      <ContactCTA />
    </PortfolioShell>
  )
}
