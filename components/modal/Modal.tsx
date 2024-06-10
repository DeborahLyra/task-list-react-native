import React from 'react';
import { Modal, View, TextInput, Button, StyleSheet } from 'react-native';
import { Text } from 'native-base';

type EditTaskModalProps = {
    isOpen: boolean,
    onClose: () => void,
    task: { id: number, title: string, description: string, step: string } | null,
    onSubmit: (values: { id: number, title: string, description: string, step: string }) => void,
}

export function EditTaskModal({ isOpen, onClose, task, onSubmit }: EditTaskModalProps) {
    const [title, setTitle] = React.useState(task?.title || '');
    const [description, setDescription] = React.useState(task?.description || '');

    React.useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
        }
    }, [task]);

    const handleSave = () => {
        if (task) {
            onSubmit({ id: task.id, title, description, step: task.step });
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
                    <Text bold>Title:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Title"
                        value={title}
                        onChangeText={setTitle}
                    />
                    <Text bold>Description:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        value={description}
                        onChangeText={setDescription}
                    />
                    <View style={styles.buttonContainer}>
                        <Button title="Cancel" onPress={onClose} color="#be123c" />
                        <Button title="Save" onPress={handleSave} color="#0ea5e9" />
                    </View>
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
});
