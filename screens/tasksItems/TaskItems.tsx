import { Box, Text } from "native-base";

interface TaskItemsProps {
    title: string,
    description: string
}

export function TaskItems({ title, description }: TaskItemsProps) {
    return (
        <Box bg='info.300' w={'100%'} minWidth={300} p={4} borderRadius={5}>
            <Box bg='info.200' p={2} borderRadius={5} mb={2}>
                <Text fontSize={'lg'} bold>{title}</Text>
            </Box>
            <Box minH={50} mt={5}>
                <Text fontSize={'md'}>{description}</Text>
            </Box>
        </Box>
    )
}
