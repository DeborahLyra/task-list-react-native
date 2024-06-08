import { Box, FlatList, Heading, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { useTasksStore } from '@/TaskStore';
import { TaskItems } from '../tasksItems/TaskItems';
import { api } from '@/app/api';

type Item = {
  id: string,
  title: string,
  description: string,
  step: string
}

export default function Tasks() {
  const tasks = useTasksStore(state => state.tasks);
  const setTasks = useTasksStore(state => state.setTasks);
  const removeTask = useTasksStore(state => state.removeTask);
  const getTasks = useTasksStore(state => state.getTasks);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getTasks()
    console.log(tasks)
  }, [tasks]);

  return (
    <Box safeArea bg={'info.500'} flex={1} alignItems='center' pt={16}>
      <Heading color='#27272a' mb={5}>To Do List</Heading>
      <Text mb={5} bold>Press play when you start the task</Text>
      <Box>
        <FlatList
          data={tasks}
          keyExtractor={item => item.id.toString()} 
          renderItem={({ item }) => (
            <TaskItems
              title={item.title}
              description={item.description}
              iconName='play'
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
