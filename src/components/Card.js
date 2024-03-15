import { Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const Card = ({ title, description, imageSrc }) => {
  // Implement the UI for the Card component according to the instructions.
  // You should be able to implement the component with the elements imported above.
  // Feel free to import other UI components from Chakra UI if you wish to.
  return (
    <VStack borderRadius="lg" spacing={2} backgroundColor="white" textColor="black" textAlign="left" alignItems="left">
      <Image src={imageSrc} alt={title} borderRadius="lg" padding="0"  />
      <VStack p={2} spacing={1} alignItems="flex-start">
        <Heading size="md">{title}</Heading>
        <Text>{description}</Text>
      </VStack>
      <HStack p={2} padding={2}>
        <Text>Read more</Text>
        <FontAwesomeIcon icon={faArrowRight} size="1x"/>
      </HStack>
    </VStack>
  );
};

export default Card;
