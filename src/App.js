import { ChakraProvider } from '@chakra-ui/react';
import Header from './components/Header';
import LandingSection from './components/LandingSection';
import ProjectsSection from './components/ProjectsSection';
import ContactMeSection from './components/ContactMeSection';
import Footer from './components/Footer';
import { AlertProvider } from './context/alertContext';
import Alert from './components/Alert';

function App() {
  const handleWheelScroll = (event) => {
    // Prevent the default scroll behavior
    // event.preventDefault();

    // Calculate the new scroll position based on the wheel delta
    const delta = event.deltaY || event.detail || event.wheelDelta;
    const scrollSpeed = 1; // Adjust scroll speed as needed
    const newScrollPosition = window.pageYOffset + delta * scrollSpeed;

    // Manually set the new scroll position
    window.scrollTo(0, newScrollPosition);
  };
  return (
    <ChakraProvider>
      <AlertProvider>
        <main onWheel={handleWheelScroll}>
          <Header />
          <LandingSection />
          <ProjectsSection />
          <ContactMeSection />
          <Footer />
          <Alert />
        </main>
      </AlertProvider>
    </ChakraProvider>
  );
}

export default App;
