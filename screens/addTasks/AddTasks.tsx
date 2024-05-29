import React from 'react';
import { Box, Button, FormControl, Heading, Input, TextArea, VStack } from 'native-base';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useTasksStore } from '@/TaskStore';
import { useNavigation } from 'expo-router';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

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
    const navigation = useNavigation();
    const addTask = useTasksStore(state => state.addTask);

    const handlePressOutside = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={handlePressOutside}>
            <Box safeArea bg={'info.500'} flex={1} alignItems='center' pt={24}>
                <Heading color='#27272a' mb={10}>Add a new task </Heading>

                <Formik
                    initialValues={{ title: '', description: '' }}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                        addTask(values.title, values.description);
                        actions.resetForm();
                        alert("Task added successfully");
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <VStack space={4} bg='info.300' p={2} pb={6} borderRadius={5} >
                            <FormControl isInvalid={touched.title && !!errors.title}>
                                <FormControl.Label>Title</FormControl.Label>
                                <Input
                                    placeholder="Write the title of the task"
                                    onChangeText={handleChange('title')}
                                    onBlur={handleBlur('title')}
                                    value={values.title}
                                    w="80%"
                                    bg='info.200'
                                />
                                <FormControl.ErrorMessage>{errors.title}</FormControl.ErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={touched.description && !!errors.description}>
                                <FormControl.Label>Description</FormControl.Label>
                                <TextArea
                                    placeholder="Write the description of the task"
                                    onChangeText={handleChange('description')}
                                    onBlur={handleBlur('description')}
                                    value={values.description}
                                    autoCompleteType={undefined}
                                    w="80%"
                                    bg='info.200'
                                />
                                <FormControl.ErrorMessage>{errors.description}</FormControl.ErrorMessage>
                            </FormControl>
                            <Button onPress={(e) => handleSubmit(e as any)}>
                                Add Task
                            </Button>
                        </VStack>
                    )}
                </Formik>
            </Box>
        </TouchableWithoutFeedback>
    );
}
