import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
  extendTheme,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import FullScreenSection from './FullScreenSection';
import useSubmit from '../hooks/useSubmit';
import { useAlertContext } from '../context/alertContext';

const breakpoints = {
  customMd: '64em'
};

const theme = extendTheme({breakpoints});

const LandingSection = () => {
  const { isLoading, response, submit } = useSubmit();
  const { onOpen } = useAlertContext();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      email: '',
      type: '',
      comment: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      type: Yup.string().required('Type is required'),
      comment: Yup.string().min(25, "Must be at least 25 characters long").required('Comment is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      submit(values);
      resetForm();
    },
  });

  const getFieldProps = () => ({
    firstName: formik.getFieldProps('firstName'),
    email: formik.getFieldProps('email'),
    type: formik.getFieldProps('type'),
    comment: formik.getFieldProps('comment'),
  });


  useEffect(() => {
    if (response) {
      if (response.type === 'success') {
        onOpen(formik.values.firstName);
        formik.resetForm();
      } else if (response.type === 'error') {
        onOpen(`Error`, response);
      }
    }
  }, [response, formik.values.firstName, onOpen]);

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}>
      <VStack alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box theme={theme} rounded="lg" w='100%' >
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
              <FormControl
                isRequired
                isInvalid={formik.touched.firstName && formik.errors.firstName}>
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                  {...getFieldProps().firstName}
                  id="firstName"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={formik.touched.email && formik.errors.email}>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  {...getFieldProps().email}
                  id="email"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select
                  {...getFieldProps().type}
                  id="type"
                  name="type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}>
                  <option value="hireMe">Freelance project proposal</option>
                  <option value="openSource">
                    Open source consultancy session
                  </option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>
              <FormControl
                isInvalid={formik.touched.comment && formik.errors.comment}>
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                  {...getFieldProps().comment}
                  id="comment"
                  name="comment"
                  height={250}
                  value={formik.values.comment}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
              </FormControl>
              <Button type="submit" colorScheme="purple" isLoading={isLoading}>
                {isLoading ? 'Submitting' : 'Submit'}
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default LandingSection;
