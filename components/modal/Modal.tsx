import { Button, FormControl, HStack, Input, Modal, TextArea } from "native-base";
import React from "react";

function ModalComponent() {
    const [modalVisible, setModalVisible] = React.useState(false);
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    return <>
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
            <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header>Edit your task</Modal.Header>
                <Modal.Body>
                    <FormControl>
                        <FormControl.Label>Title</FormControl.Label>
                        <Input ref={initialRef} />
                    </FormControl>
                    <FormControl mt="3">
                        <FormControl.Label>Description</FormControl.Label>
                        <TextArea
                            placeholder="Write the description of the task"
                            autoCompleteType={undefined}
                            w="80%"
                            bg='info.200'
                        />
                    </FormControl>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={2}>
                        <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                            setModalVisible(false);
                        }}>
                            Cancel
                        </Button>
                        <Button onPress={() => {
                            setModalVisible(false);
                        }}>
                            Save
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
        <HStack space="4" justifyContent="center" alignItems="center">
            <Button onPress={() => {
                setModalVisible(!modalVisible);
            }}>
                Open Modal
            </Button>
            <Input w="32" ref={finalRef} placeholder="Enter the OTP" _light={{
                placeholderTextColor: "blueGray.700"
            }} _dark={{
                placeholderTextColor: "blueGray.100"
            }} />
        </HStack>
    </>;
}