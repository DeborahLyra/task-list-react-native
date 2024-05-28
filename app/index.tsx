import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import { RootStackParamList } from "@/types";
import AddTasks from "@/screens/addTasks/AddTasks";
import Tasks from "@/screens/tasks/Tasks";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

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
        </Tab.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
