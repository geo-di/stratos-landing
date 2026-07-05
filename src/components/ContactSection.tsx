import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Clock, Phone, Navigation, Locate } from "lucide-react";
import { useSharedGoogleData } from "@/hooks/useSharedGoogleData";

const DESTINATION = "Stratos Market, Anaxos, Lesvos, Greece";

const ContactSection = () => {
  const { openingHours, loading, error } = useSharedGoogleData('ChIJyWRl2reQuhQR31Cno53zvaA');

  const [origin, setOrigin] = useState("");

  const openDirections = (from?: string) => {
    const base = "https://www.google.com/maps/dir/?api=1";
    const url = from
      ? `${base}&origin=${encodeURIComponent(from)}&destination=${encodeURIComponent(DESTINATION)}`
      : `${base}&destination=${encodeURIComponent(DESTINATION)}`;
    window.open(url, "_blank");
  };

  const handleDirections = () =>
    window.open('https://www.google.com/maps/place/Stratos+Market/@39.3161481,26.1429499,17z/data=!3m1!4b1!4m6!3m5!1s0x14ba90b7da6564c9:0xa0bdf39da3a750df!8m2!3d39.3161481!4d26.1455248!16s%2Fg%2F11fxg0j296', '_blank');

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      openDirections();
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => openDirections(`${pos.coords.latitude},${pos.coords.longitude}`),
      () => openDirections(),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const handleOriginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openDirections(origin.trim() || undefined);
  };

  const handleCallStore = () => window.open('tel:+302253092421', '_self');

  const renderOpeningHours = () => {
    if (loading) return <p className="text-muted-foreground text-sm">Loading hours…</p>;
    if (error || !openingHours?.weekday_text) {
      const fallback = [
        ['Monday', '8:00 – 21:30'],
        ['Tuesday', '8:00 – 21:30'],
        ['Wednesday', '8:00 – 21:30'],
        ['Thursday', '8:00 – 21:30'],
        ['Friday', '8:00 – 21:30'],
        ['Saturday', '8:00 – 22:00'],
        ['Sunday', '9:00 – 20:00'],
      ];
      return (
        <ul className="space-y-1.5 text-sm">
          {fallback.map(([d, h]) => (
            <li key={d} className="flex justify-between gap-4">
              <span className="text-muted-foreground">{d}</span>
              <span className="text-foreground font-medium">{h}</span>
            </li>
          ))}
        </ul>
      );
    }
    return (
      <ul className="space-y-1.5 text-sm">
        {openingHours.weekday_text.map((dayHours, i) => {
          const [day, ...rest] = dayHours.split(':');
          return (
            <li key={i} className="flex justify-between gap-4">
              <span className="text-muted-foreground">{day}</span>
              <span className="text-foreground font-medium">{rest.join(':').trim()}</span>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <section id="contact" className="py-20 md:py-28 px-5 sm:px-8 bg-gradient-earth">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-14">
          <span className="text-xs uppercase tracking-[0.28em] text-primary font-medium">
            Find us · Anaxos
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-foreground mt-4 mb-5 leading-[1.05] text-balance">
            Fifty steps
            <span className="italic text-primary"> from the sea.</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            The door&apos;s open every day. Come by wet from the beach, we don&apos;t mind.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5">
          {/* Address */}
          <div className="bento-card lg:col-span-4 p-8">
            <MapPin className="h-6 w-6 text-primary mb-4" />
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-2">Address</div>
            <p className="font-display text-2xl text-foreground leading-snug">
              Stratos Market<br />
              Anaxos, Lesvos<br />
              North Aegean, Greece
            </p>
          </div>

          {/* Hours */}
          <div className="bento-card lg:col-span-4 p-8">
            <Clock className="h-6 w-6 text-primary mb-4" />
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4">Opening Hours</div>
            {renderOpeningHours()}
          </div>

          {/* CTAs */}
          <div className="bento-card lg:col-span-4 p-8 !bg-primary text-primary-foreground grain flex flex-col justify-between gap-6">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] opacity-80 mb-3">Say hello</div>
              <p className="font-display text-3xl leading-tight">
                Pop in, or give us a ring.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                onClick={handleDirections}
                className="w-full rounded-full bg-background text-foreground hover:bg-background/90"
              >
                <MapPin className="mr-2 h-4 w-4" />
                Open in Maps
              </Button>
              <Button
                onClick={handleCallStore}
                variant="outline"
                className="w-full rounded-full border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Phone className="mr-2 h-4 w-4" />
                +30 22530 92421
              </Button>
            </div>
          </div>

          {/* Map */}
          <div className="bento-card lg:col-span-8 lg:row-span-2 overflow-hidden min-h-[360px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3098.8621234567!2d26.1429499!3d39.3161481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ba90b7da6564c9%3A0xa0bdf39da3a750df!2sStratos%20Market!5e0!3m2!1sen!2s!4v1641234567890!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 360 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[15%]"
              title="Stratos Market on the map"
            />
          </div>

          {/* Notes */}
          <div className="bento-card lg:col-span-4 p-8 !bg-olive text-olive-foreground">
            <div className="text-xs uppercase tracking-[0.22em] opacity-80 mb-3">A note before you come</div>
            <p className="font-display text-2xl leading-snug mb-4">
              Fifty metres from the sand, free parking at the door.
            </p>
            <p className="text-sm opacity-90">
              Perfect for a stop between the beach and the village — or the beach and the taverna.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
