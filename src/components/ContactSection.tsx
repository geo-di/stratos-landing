import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Clock, Phone, Navigation, Locate } from "lucide-react";
import { useSharedGoogleData } from "@/hooks/useSharedGoogleData";
import { STORE_ADDRESS, STORE_MAPS_URL, STORE_PHONE_DISPLAY, STORE_PHONE_TEL, STORE_PLACE_ID } from "@/config/store";

const ContactSection = () => {
  const { openingHours, loading, error } = useSharedGoogleData(STORE_PLACE_ID);

  const [origin, setOrigin] = useState("");

  const openDirections = (from?: string) => {
    const base = "https://www.google.com/maps/dir/?api=1";
    const url = from
      ? `${base}&origin=${encodeURIComponent(from)}&destination=${encodeURIComponent(STORE_ADDRESS)}`
      : `${base}&destination=${encodeURIComponent(STORE_ADDRESS)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDirections = () => window.open(STORE_MAPS_URL, '_blank', 'noopener,noreferrer');

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

  const handleCallStore = () => window.open(`tel:${STORE_PHONE_TEL}`, '_self');

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
        <ul className="flex flex-col gap-[7px] text-sm">
          {fallback.map(([d, h]) => (
            <li key={d} className="flex justify-between gap-4">
              <span className="text-muted-foreground">{d}</span>
              <span className="text-foreground font-semibold">{h}</span>
            </li>
          ))}
        </ul>
      );
    }
    return (
      <ul className="flex flex-col gap-[7px] text-sm">
        {openingHours.weekday_text.map((dayHours, i) => {
          const [day, ...rest] = dayHours.split(':');
          return (
            <li key={i} className="flex justify-between gap-4">
              <span className="text-muted-foreground">{day}</span>
              <span className="text-foreground font-semibold">{rest.join(':').trim()}</span>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <section id="contact" className="py-16 md:py-24 px-5 sm:px-10 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-[clamp(2.5rem,6vw,64px)] text-foreground mb-3">
          Find us in Anaxos
        </h2>
        <p className="text-[18px] text-muted-foreground max-w-[560px] mb-10 md:mb-12 text-pretty">
          Fifty metres from the sea. The door&apos;s open every day, wet feet welcome.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
          {/* Address */}
          <div className="bento-card lg:col-span-4 p-8">
            <MapPin className="h-6 w-6 text-primary mb-4" />
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground mb-2.5">
              Address
            </div>
            <p className="font-display font-bold text-[26px] text-foreground leading-[1.05] m-0">
              Stratos Market<br />
              Anaxos, Lesvos<br />
              North Aegean
            </p>
          </div>

          {/* Hours */}
          <div className="bento-card lg:col-span-4 p-8">
            <Clock className="h-6 w-6 text-primary mb-4" />
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground mb-4">
              Opening Hours
            </div>
            {renderOpeningHours()}
          </div>

          {/* Say hello */}
          <div className="lg:col-span-4 rounded-[20px] bg-primary text-primary-foreground p-8 flex flex-col justify-between gap-6">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] opacity-80 mb-3">
                Say hello
              </div>
              <p className="font-display text-[34px] leading-[0.95] m-0">
                Pop in, or give us a ring.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                onClick={handleDirections}
                className="w-full h-auto py-3.5 rounded-full bg-background text-foreground hover:bg-background/90 text-sm font-bold"
              >
                <MapPin className="mr-2 h-4 w-4" />
                Open in Maps
              </Button>
              <Button
                onClick={handleCallStore}
                variant="outline"
                className="w-full h-auto py-3.5 rounded-full border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 text-sm font-bold"
              >
                <Phone className="mr-2 h-4 w-4" />
                {STORE_PHONE_DISPLAY}
              </Button>
            </div>
          </div>

          {/* Map */}
          <div className="bento-card md:col-span-2 lg:col-span-8 min-h-[300px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3098.8621234567!2d26.1429499!3d39.3161481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ba90b7da6564c9%3A0xa0bdf39da3a750df!2sStratos%20Market!5e0!3m2!1sen!2s!4v1641234567890!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 300 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Stratos Market on the map"
            />
          </div>

          {/* Before you come */}
          <div className="md:col-span-2 lg:col-span-4 rounded-[20px] bg-ultramarine text-ultramarine-foreground p-8 flex flex-col justify-center">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] opacity-80 mb-3">
              Before you come
            </div>
            <p className="font-display text-[34px] leading-[0.95] m-0 mb-3.5">
              Free parking right at the door.
            </p>
            <p className="text-sm opacity-85 m-0">
              A good stop between the beach and the village walk.
            </p>
          </div>

          {/* Directions */}
          <div className="bento-card md:col-span-2 lg:col-span-12 p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center">
              <div className="md:col-span-5">
                <Navigation className="h-6 w-6 text-primary mb-3" />
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground mb-2">
                  Get directions
                </div>
                <p className="font-display text-3xl md:text-[40px] text-foreground leading-none m-0 text-balance">
                  Coming from somewhere else on the island?
                </p>
              </div>
              <form onSubmit={handleOriginSubmit} className="md:col-span-7 flex flex-col gap-3">
                <label
                  htmlFor="origin"
                  className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground"
                >
                  Starting point
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    id="origin"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    placeholder="e.g. Mytilene Airport, Molyvos, your hotel…"
                    className="h-12 rounded-full px-5 bg-background border-border"
                  />
                  <Button
                    type="submit"
                    className="h-12 rounded-full bg-primary hover:bg-primary-deep text-primary-foreground px-6 font-bold"
                  >
                    <Navigation className="mr-2 h-4 w-4" />
                    Directions
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleUseMyLocation}
                    className="rounded-full border-ultramarine/30 bg-background text-ultramarine hover:bg-ultramarine hover:text-ultramarine-foreground font-semibold"
                  >
                    <Locate className="mr-2 h-4 w-4" />
                    Use my location
                  </Button>
                  {['Mytilene Airport', 'Molyvos', 'Petra', 'Skala Eressos'].map((place) => (
                    <Button
                      key={place}
                      type="button"
                      variant="outline"
                      onClick={() => openDirections(place + ', Lesvos, Greece')}
                      className="rounded-full border-border bg-background text-foreground hover:bg-muted font-semibold"
                    >
                      {place}
                    </Button>
                  ))}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
