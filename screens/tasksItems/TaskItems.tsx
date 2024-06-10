import { Box, Flex, HStack, IconButton, Text } from "native-base";
import { Ionicons } from '@expo/vector-icons';


type IoniconsName = keyof typeof Ionicons.glyphMap;

interface TaskItemsProps {
    title: string,
    description: string,
    iconName: IoniconsName,
    onRemove: (id: number) => void,
    id: number,
    onPlay: (id: number) => void,
}

export function TaskItems({ title, description, iconName, onRemove, id, onPlay }: TaskItemsProps) {
    return (
        <Box bg='info.300' w={'100%'} minWidth={300} p={2} borderRadius={5}>
            <HStack justifyContent="space-between" alignItems="center" bg='info.200' p={2}>
                <Text fontSize={'md'} bold mr={2}>{title}</Text>
                <Flex direction="row" alignItems={'center'}>
                    <IconButton
                        p={1}
                        onPress={() => onPlay(id)}
                        icon={<Ionicons name={iconName} size={20} color="#21859c" />}
                    />
                    <IconButton
                       
                        p={1}
                        icon={<Ionicons name="pencil" size={16} color="#21859c" />}
                    />
                    <IconButton
                        p={1}
                        onPress={() => onRemove(id)}
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
