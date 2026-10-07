import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, ImageOff } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { DRIVE_FOLDER_ID } from "@/config/gallery";
import { useDriveImages } from "@/hooks/useDriveImages";

const Gallery = () => {
  const { data: driveImages, isLoading, error } = useDriveImages(DRIVE_FOLDER_ID);
  const images = driveImages && driveImages.length > 0 ? driveImages : [];
  const formatTitle = (title: string) => title.replace(/_/g, ' ');

  return (
    <div className="min-h-screen bg-gradient-earth">
      <Navigation />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 md:py-20">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10">
          <ArrowLeft className="h-4 w-4" />
          Back home
        </Link>

        <div className="max-w-2xl mb-14">
          <h1 className="font-display text-4xl md:text-6xl text-foreground mb-5 leading-[1.05] text-balance">
            Gallery
          </h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Photos of the shop and the shelf in Anaxos.
          </p>

          {isLoading && (
            <div className="flex items-center gap-2 mt-6 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <span className="text-sm">Loading the album…</span>
            </div>
          )}
        </div>

        {images.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {images.map((image, i) => (
              <Dialog key={image.id}>
                <DialogTrigger asChild>
                  <Card
                    className={`bento-card border-none cursor-pointer group ${
                      i % 5 === 0 ? 'row-span-2 aspect-[3/4]' : 'aspect-square'
                    }`}
                  >
                    <CardContent className="p-0 h-full">
                      <div className="h-full overflow-hidden">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover group-hover:scale-[1.03] [transition:transform_400ms_ease]"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const parent = e.currentTarget.parentElement;
                            if (parent) {
                              parent.innerHTML = `<div class="flex items-center justify-center h-full bg-muted text-muted-foreground text-xs p-4 text-center">${formatTitle(image.title)}</div>`;
                            }
                          }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-background rounded-3xl overflow-hidden">
                  <div className="relative">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-auto max-h-[80vh] object-contain bg-foreground/95"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-6">
                      <h3 className="font-display text-2xl text-background">
                        {formatTitle(image.title)}
                      </h3>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        ) : (
          !isLoading && (
            <div className="bento-card p-10 md:p-14 max-w-xl bg-muted/40 border-none">
              <ImageOff className="h-8 w-8 text-primary mb-4" />
              <p className="font-display text-2xl md:text-3xl text-foreground leading-snug text-balance">
                The album&apos;s empty for the moment.
              </p>
              <p className="mt-4 text-muted-foreground text-pretty">
                {error
                  ? 'Photos will be added soon — stay tuned.'
                  : 'We\u2019re still curating the pictures from this summer. Check back in a little while.'}
              </p>
            </div>
          )
        )}

        <div className="mt-20 rounded-3xl bg-primary text-primary-foreground p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 grain">
          <div className="max-w-xl">
            <p className="font-display text-3xl md:text-4xl leading-snug text-balance">
              Better in person, always.
            </p>
            <p className="mt-2 opacity-90">
              Pictures are nice — the smell of the herbs is better. Come find us in Anaxos.
            </p>
          </div>
          <Link to="/#contact">
            <Button size="lg" className="rounded-full bg-background text-foreground hover:bg-background/90">
              How to find us
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Gallery;
