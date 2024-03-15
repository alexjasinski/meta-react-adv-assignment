import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from '@fortawesome/free-brands-svg-icons';
import { Box, HStack } from '@chakra-ui/react';

const socials = [
  {
    icon: faEnvelope,
    url: 'mailto: hello@example.com',
  },
  {
    icon: faGithub,
    url: 'https://github.com',
  },
  {
    icon: faLinkedin,
    url: 'https://www.linkedin.com',
  },
  {
    icon: faMedium,
    url: 'https://medium.com',
  },
  {
    icon: faStackOverflow,
    url: 'https://stackoverflow.com',
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const header = headerRef.current;

      if (prevScrollPos < currentScrollPos) {
        // Scrolling down
        header.style.transform = 'translateY(-200px)';
      } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  // const handleClick = (anchor) => () => {
  //   const id = `${anchor}-section`;
  //   const element = document.getElementById(id);
  //   if (element) {
  //     element.scrollIntoView({
  //       behavior: 'smooth',
  //       block: 'start',
  //     });
  //   }
  // };

  return (
    <>
      <Box
        ref={headerRef}
        position="sticky"
        top={0}
        left={0}
        right={0}
        translateY={0}
        transitionProperty="transform"
        transitionDuration=".3s"
        transitionTimingFunction="ease-in-out"
        backgroundColor="#18181b"
        paddingY={1}
        zIndex={10}>
        {prevScrollPos && <header className="header"></header>}
        <Box color="white" maxWidth="1280px" margin="0 auto">
          <HStack
            px={8}
            py={0}
            justifyContent="space-between"
            alignItems="flex-start"
            maxH="200px"
            padding={10}>
            <nav>
              <HStack spacing={3}>
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer">
                    <FontAwesomeIcon
                      icon={social.icon}
                      className="social icon"
                    />
                  </a>
                ))}
              </HStack>
            </nav>
            <nav>
              <HStack spacing={6}>
                <a
                  href="#contact-me"
                  id="contactme-section"
                  // style="white-space: nowrap"
                  // onClick={handleClick('contact-me')}
                >
                  Contact&nbsp;Me
                </a>
                <a
                  href="#projects"
                  id="projects-section"
                  // onClick={handleClick('projects')}
                >
                  Projects
                </a>
              </HStack>
            </nav>
          </HStack>
        </Box>
      </Box>
    </>
  );
};
export default Header;
