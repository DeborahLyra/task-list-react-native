import { Box, Flex, HStack, IconButton, Text } from "native-base";
import { Ionicons } from '@expo/vector-icons';


type IoniconsName = keyof typeof Ionicons.glyphMap;

interface TaskItemsProps {
    title: string,
    description: string,
    onDelete: () => void,
    iconName: IoniconsName
}

export function TaskItems({ title, description, onDelete, iconName }: TaskItemsProps) {
    return (
        <Box bg='info.300' w={'100%'} minWidth={300} p={2} borderRadius={5}>
            <HStack justifyContent="space-between" alignItems="center" bg='info.200' p={1}>
                <Text fontSize={'md'} bold>{title}</Text>
                <Flex direction="row">
                    <IconButton
                        onPress={onDelete}
                        icon={<Ionicons name= {iconName} size={20} color="#21859c" />}
                    />
                    <IconButton
                        onPress={onDelete}
                        icon={<Ionicons name="trash" size={20} color="#be123c" />}
                    />
                </Flex>
            </HStack>
            <Box minH={50} mt={5}>
                <Text fontSize={'md'}>{description}</Text>
            </Box>
        </Box>
    )
}
