import { Box, FlatList, Heading, Text } from 'native-base';
import React from 'react';
import { useTasksStore } from '@/TaskStore';
import { TaskItems } from '../tasksItems/TaskItems';

export default function Tasks() {
  const tasks = useTasksStore(state => state.tasks);
  const removeTask = useTasksStore(state => state.removeTask);

  console.log(tasks);

  return (
    <Box safeArea bg={'info.500'} flex={1} alignItems='center' pt={16}>
      <Heading color='#27272a' mb={10}>To Do List</Heading>
      <Box>
        <FlatList
          data={tasks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TaskItems
              title={item.title}
              description={item.description}
              onDelete={() => removeTask(item.id)}
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
