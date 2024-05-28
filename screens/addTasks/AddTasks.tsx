import { Box, Text } from 'native-base'
import React from 'react'
import { Formik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    title: yup.string()
      .min(2, 'Title must be at least 2 characters')
      .max(24, 'Title cannot be longer than 24 characters')
      .required('Title is required'),
    description: yup.string()
      .min(8, 'Description must be at least 8 characters')
      .max(60, 'Description cannot be longer than 60 characters')
      .required('Description is required'),
  });

export default function AddTasks() {
  return (
    <Box safeArea bg={'primary.600'} flex={1}>
       <Text>add task </Text>
    </Box>
  )
}
