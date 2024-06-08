import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import AddTasks from "@/screens/addTasks/AddTasks";
import Tasks from "@/screens/tasks/Tasks";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import InProgressTasks from '@/screens/inProgressTasks/InProgressTasks';
import DoneTasks from '@/screens/doneTasks/DoneTasks';

const Tab = createBottomTabNavigator();

export default function Index() {
  return (
    <NativeBaseProvider>
      <NavigationContainer independent={true}>
        <Tab.Navigator>
          <Tab.Screen
            name="add-tasks"
            component={AddTasks}
            options={{
              headerShown: false,
              tabBarLabel: 'Add Tasks',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="add-circle-outline" size={size} color={color} />
              )
            }}
          />
          <Tab.Screen
            name="tasks"
            component={Tasks}
            options={{
              headerShown: false,
              tabBarLabel: 'Tasks',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="list-outline" size={size} color={color} />
              )
            }}
          />
          <Tab.Screen
            name="inProgressTasks"
            component={InProgressTasks}
            options={{
              headerShown: false,
              tabBarLabel: 'In Progress',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="play" size={size} color={color} />
              )
            }}
          />

          <Tab.Screen
            name="doneTasks"
            component={DoneTasks}
            options={{
              headerShown: false,
              tabBarLabel: 'Done',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="checkmark-done" size={size} color={color} />
              )
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
