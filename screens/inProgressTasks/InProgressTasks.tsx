import { Box, FlatList, Heading, HStack, Spinner, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { useTasksStore } from '@/TaskStore';
import { TaskItems } from '../tasksItems/TaskItems';

type Item = {
  id: number,
  title: string,
  description: string,
  step: string
}

export default function InProgressTasks() {
  const tasks = useTasksStore(state => state.tasks);
  const removeTask = useTasksStore(state => state.removeTask);
  const doneTask = useTasksStore(state => state.doneTask);
  const getTasks = useTasksStore(state => state.getTasks);
  const [inProgressTasks, setInProgressTasks] = useState<Item[]>([]);

  useEffect(() => {
    getTasks()
  }, []);

  useEffect(() => {
    const filterInProgressTasks = () => {
      const filteredTasks = tasks.filter(task => task.step === 'Em andamento');
      setInProgressTasks(filteredTasks);
    };
    filterInProgressTasks();
  }, [tasks]);

  const handleRemoveTask = async (id: number) => {
    try {
      await removeTask(id);
      await getTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDoneTask = async (id: number) => {
    try {
      await doneTask(id);
      await getTasks();
    } catch (error) {
      console.error(error);
    }
  };

  if (tasks.length === 0) {
    return (
      <Box safeArea bg={'info.500'} flex={1} alignItems='center' pt={16}>
        < HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="info.200" fontSize="md">
            Loading
          </Heading>
        </HStack>
      </Box>
    )
  } else {
    return (
      <Box safeArea bg={'info.500'} flex={1} alignItems='center' pt={16}>
        <Heading color='#27272a' mb={5}>In Progress Tasks</Heading>
        <Text mb={5} bold>Press check when you are done</Text>
        <Box flex={1}>
          <FlatList
            data={inProgressTasks}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <TaskItems
                id={item.id}
                title={item.title}
                description={item.description}
                onRemove={handleRemoveTask}
                onPlay={handleDoneTask}
                iconName='checkmark-done'
                canUpdate={false}
                step=''
                onEdit={() => console.log('')}
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
}
