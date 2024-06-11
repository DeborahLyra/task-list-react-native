import { Box, FlatList, Heading, HStack, Spinner, Text, useToast } from 'native-base';
import React, { useEffect, useState } from 'react';
import { useTasksStore } from '@/TaskStore';
import { TaskItems } from '../tasksItems/TaskItems';

type Item = {
  id: number,
  title: string,
  description: string,
  step: string
}

export default function DoneTasks() {
  const toast = useToast();
  const tasks = useTasksStore(state => state.tasks);
  const removeTask = useTasksStore(state => state.removeTask);
  const getTasks = useTasksStore(state => state.getTasks);
  const [doneTasks, setDoneTasks] = useState<Item[]>([]);

  useEffect(() => {
    getTasks()
  }, []);

  useEffect(() => {
    const filterInProgressTasks = () => {
      const filteredTasks = tasks.filter(task => task.step === 'Pronto');
      setDoneTasks(filteredTasks);
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

  const handleTaskDone = async (id: number) => {
    toast.show({
      description: "Congratulations, this task is done!",
      placement: "top"
    });
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
        <Heading color='#27272a' mb={5}>Done Tasks</Heading>
        <Text mb={5} bold>Check out the tasks you already completed</Text>
        <Box flex={1}>
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
                onPlay={handleTaskDone}
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
