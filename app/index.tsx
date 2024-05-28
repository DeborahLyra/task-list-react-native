import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import { RootStackParamList } from "@/types";
import AddTasks from "@/screens/addTasks/AddTasks";
import Tasks from "@/screens/tasks/Tasks";


const Stack = createNativeStackNavigator<RootStackParamList>();


export default function Index() {
  return (
    <NativeBaseProvider>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="AddTask" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="AddTask" component={AddTasks} />
          <Stack.Screen name="Tasks" component={Tasks} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
