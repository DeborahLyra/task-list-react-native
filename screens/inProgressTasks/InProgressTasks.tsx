import { Box, FlatList, Heading, Text } from 'native-base';
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
  const playTask = useTasksStore(state => state.playTask);
  const getTasks = useTasksStore(state => state.getTasks);
  const [inProgressTasks, setInProgressTasks] = useState<Item[]>([]);;


  useEffect(() => {
    getTasks()
    
  }, []);

  useEffect(() => {
    console.log(tasks)
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

  const handlePlayTask = async (id: number) => {
    try {
      await playTask(id);
      await getTasks(); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box safeArea bg={'info.500'} flex={1} alignItems='center' pt={16}>
      <Heading color='#27272a' mb={5}>In Progress Tasks</Heading>
      <Text mb={5} bold>Press check when you are done</Text>
      <Box>
        <FlatList
          data={inProgressTasks}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TaskItems
              id={item.id}
              title={item.title}
              description={item.description}
              onRemove={handleRemoveTask}
              onPlay={handlePlayTask}
              iconName='checkmark-done'
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
