import { Box, FlatList, Heading, Text } from 'native-base';
import React from 'react';
import { useTasksStore } from '@/TaskStore';
import { TaskItems } from '../tasksItems/TaskItems';

export default function DoneTasks() {
  const tasks = useTasksStore(state => state.tasks);
  const removeTask = useTasksStore(state => state.removeTask);

  const handleRemoveTask = async (id: number) => {
    try {
      await removeTask(id);
    } catch (error) {
      console.error('Failed to remove task', error);
    }
  };
  return (
    <Box safeArea bg={'info.500'} flex={1} alignItems='center' pt={16}>
      <Heading color='#27272a' mb={5}>Done Tasks</Heading>
      <Text mb={5} bold>Check out the tasks you already completed</Text>
      <Box>
        <FlatList
          data={tasks}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TaskItems
              title={item.title}
              description={item.description}
              onRemove={handleRemoveTask}
              id={item.id}
              iconName='happy'
            />
          )}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <Box height={2} />}
          ListEmptyComponent={() => (
            <Box bg='info.300' p={4} borderRadius={5}>
              <Text fontSize={'lg'} bold color='red.700'>No Tasks</Text>
            </Box>
          )}
        />
      </Box>
    </Box>
  );
}
