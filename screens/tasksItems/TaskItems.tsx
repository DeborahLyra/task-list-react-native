import { Box, HStack, IconButton, Text } from "native-base";
import { Ionicons } from '@expo/vector-icons';

interface TaskItemsProps {
    title: string,
    description: string,
    onDelete: () => void
}

export function TaskItems({ title, description, onDelete }: TaskItemsProps) {
    return (
        <Box bg='info.300' w={'100%'} minWidth={300} p={2} borderRadius={5}>
            <HStack justifyContent="space-between" alignItems="center" bg='info.200' p={1}>
                <Text fontSize={'md'} bold>{title}</Text>
                <IconButton
                    onPress={onDelete}
                    icon={<Ionicons name="trash" size={20} color="#be123c" />}
                />
            </HStack>
            <Box minH={50} mt={5}>
                <Text fontSize={'md'}>{description}</Text>
            </Box>
        </Box>
    )
}
