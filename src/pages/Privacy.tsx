import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { openConsentBanner } from "@/lib/analytics";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-earth">
      <Navigation />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 md:py-20">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10">
          <ArrowLeft className="h-4 w-4" />
          Back home
        </Link>

        <div className="max-w-2xl">
          <h1 className="font-display text-4xl md:text-6xl text-foreground mb-8 leading-[1.05] text-balance">
            Privacy &amp; Cookies
          </h1>

          <div className="space-y-6 text-muted-foreground leading-relaxed text-pretty">
            <p>
              This website is the online noticeboard of Stratos Market, a small
              family shop in Anaxos, Lesvos. We don&apos;t have accounts,
              newsletters or online orders, so there is very little to tell you
              — but here it is.
            </p>

            <h2 className="font-display text-2xl text-foreground pt-2">What we collect</h2>
            <p>
              If you agree to it, we use Google Analytics to count visits:
              which pages people look at, roughly where visitors come from, and
              how they found the site. This uses cookies (small files starting
              with <code className="text-sm">_ga</code>) stored in your
              browser. The statistics are anonymous — we never see names,
              email addresses or anything that identifies you personally.
            </p>
            <p>
              If you decline, no analytics run and no cookies are set. The
              website works exactly the same either way.
            </p>

            <h2 className="font-display text-2xl text-foreground pt-2">Changing your mind</h2>
            <p>
              You can change your cookie choice at any time using the{" "}
              <button
                onClick={openConsentBanner}
                className="underline hover:text-primary"
              >
                cookie settings
              </button>{" "}
              — declining also removes any analytics cookies already set.
            </p>

            <h2 className="font-display text-2xl text-foreground pt-2">Questions</h2>
            <p>
              Ask us in the shop, or ring the number at the bottom of the page.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Privacy;
