import React, { useEffect, useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet } from 'react-native';
import { Text } from 'native-base';
import { Formik } from 'formik';
import * as yup from 'yup';

const stepSchema = yup
    .string()
    .matches(
        /Para fazer|Em andamento|Pronto/,
        'Os passos devem ser "Para fazer", "Em andamento" ou "Pronto"'
    );

const validationSchema = yup.object().shape({
    title: yup.string()
        .min(4, 'Title must be at least 4 characters')
        .max(64, 'Title cannot be longer than 64 characters')
        .required('Title is required'),
    description: yup.string()
        .min(8, 'Description must be at least 8 characters')
        .max(128, 'Description cannot be longer than 128 characters')
        .required('Description is required'),
    step: stepSchema,
});

type EditTaskModalProps = {
    isOpen: boolean,
    onClose: () => void,
    task: { id: number, title: string, description: string, step: string } | null,
    onSubmit: (values: { id: number, title: string, description: string, step: string }) => void,
}

export function EditTaskModal({ isOpen, onClose, task, onSubmit }: EditTaskModalProps) {
    const initialValues = task ? { title: task.title, description: task.description } : { title: '', description: '' };

    const handleSave = async (values: any) => {
        if (task) {
            onSubmit({ id: task.id, ...values, step: task.step });
            onClose();
        }
    };

    return (
        <Modal
            visible={isOpen}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Edit Task</Text>
                    {task && (
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSave}
                            enableReinitialize
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                <>
                                    <Text bold>Title:</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Title"
                                        value={values.title}
                                        onChangeText={handleChange('title')}
                                        onBlur={handleBlur('title')}
                                    />
                                    {touched.title && errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
                                    <Text bold>Description:</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Description"
                                        value={values.description}
                                        onChangeText={handleChange('description')}
                                        onBlur={handleBlur('description')}
                                    />
                                    {touched.description && errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
                                    <View style={styles.buttonContainer}>
                                        <Button title="Cancel" onPress={onClose} color="#be123c" />
                                        <Button title="Save" onPress={() => handleSubmit()} color="#0ea5e9" />
                                    </View>
                                </>
                            )}
                        </Formik>
                    )}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#0ea5e9',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    errorText: {
        color: 'red',
        marginBottom: 5,
    },
});
