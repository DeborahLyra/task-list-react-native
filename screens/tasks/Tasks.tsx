import { Box, FlatList, Heading, HStack, Spinner, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { useTasksStore } from '@/TaskStore';
import { TaskItems } from '../tasksItems/TaskItems';
import { EditTaskModal } from '@/components/modal/Modal';


type Item = {
  id: number,
  title: string,
  description: string,
  step: string
}

export default function Tasks() {
  const tasks = useTasksStore(state => state.tasks);
  const [filteredTasks, setFilteredTasks] = useState<Item[]>([]);
  const removeTask = useTasksStore(state => state.removeTask);
  const getTasks = useTasksStore(state => state.getTasks);
  const playTask = useTasksStore(state => state.playTask);
  const updateTask = useTasksStore(state => state.updateTask);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Item | null>(null);

  useEffect(() => {
    getTasks()
  }, [tasks]);

  useEffect(() => {
    const filterTasks = () => {
      const tasksToDo = tasks.filter(task => task.step === 'Para fazer');
      setFilteredTasks(tasksToDo);
    };
    filterTasks();
  }, [tasks]);

  const handleRemoveTask = async (id: number) => {
    try {
      await removeTask(id);
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

  const handleEditTask = (task: Item) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleUpdateTask = async (values: { id: number, title: string, description: string, step: string }) => {
    try {
      await updateTask(values.id, values.title, values.description, values.step);
      setIsModalOpen(false);
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
        <Heading color='#27272a' mb={5}>To Do List</Heading>
        <Text mb={5} bold>Press play when you start the task</Text>
        <Box flex={1}>
          <FlatList
            data={filteredTasks}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <TaskItems
                title={item.title}
                description={item.description}
                iconName='play'
                onRemove={handleRemoveTask}
                id={item.id}
                onPlay={handlePlayTask}
                step={item.step}
                canUpdate
                onEdit={handleEditTask}
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
        <EditTaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          task={selectedTask}
          onSubmit={handleUpdateTask}
        />
      </Box>
    );
  }


}
