import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import EventInfo from '../components/EventInfo';
import About from '../components/About';
import Organizers from '../components/Organizers';
import Highlights from '../components/Highlights';
import Schedule from '../components/Schedule';
import Speakers from '../components/Speakers';
import WhoShouldAttend from '../components/WhoShouldAttend';
import Registration from '../components/Registration';
import Certificate from '../components/Certificate';
import FAQ from '../components/FAQ';
import Venue from '../components/Venue';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <EventInfo />
        <About />
        <Organizers />
        <Highlights />
        <Schedule />
        <Speakers />
        <WhoShouldAttend />
        <Registration />
        <Certificate />
        <FAQ />
        <Venue />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
