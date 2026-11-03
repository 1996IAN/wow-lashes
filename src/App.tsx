import { useState } from "react";
import { About } from "@/components/sections/about";
import { Artists } from "@/components/sections/artists";
import { BookingModal } from "@/components/sections/booking-modal";
import { Contact } from "@/components/sections/contact";
import { CtaBanner } from "@/components/sections/cta-banner";
import { FloatingActions, Footer } from "@/components/sections/footer";
import { Gallery } from "@/components/sections/gallery";
import { Hero } from "@/components/sections/hero";
import { Location } from "@/components/sections/location";
import { Looks } from "@/components/sections/looks";
import { Navbar } from "@/components/sections/navbar";
import { OurWork } from "@/components/sections/our-work";
import { Pricing, type Visit } from "@/components/sections/pricing";
import { Services } from "@/components/sections/services";
import { Showcase } from "@/components/sections/showcase";
import { Stats } from "@/components/sections/stats";
import { WhyUs } from "@/components/sections/why-us";

export default function App() {
  const [booking, setBooking] = useState<{ open: boolean; service: string; visit: Visit }>({
    open: false,
    service: "hybrid",
    visit: "full",
  });
  const openBooking = (service = "hybrid", visit: Visit = "full") => setBooking({ open: true, service, visit });

  return (
    <>
      <Navbar onBook={() => openBooking()} />
      <main>
        <Hero onBook={() => openBooking()} />
        <WhyUs />
        <OurWork onBook={(id) => openBooking(id)} />
        <Showcase />
        <Services onBook={(id) => openBooking(id)} />
        <About />
        <Pricing onSelect={openBooking} />
        <Stats />
        <Artists />
        <Looks onBook={() => openBooking()} />
        <Gallery />
        <Location />
        <CtaBanner onBook={() => openBooking()} />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
      <BookingModal
        open={booking.open}
        onClose={() => setBooking((b) => ({ ...b, open: false }))}
        initialService={booking.service}
        initialVisit={booking.visit}
      />
    </>
  );
}
