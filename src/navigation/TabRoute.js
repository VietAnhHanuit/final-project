import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { EducationScreen } from '../screens/Education';
import { HomeScreen } from '../screens/Home';
import { OccupationScreen } from '../screens/Job';
import { RelationshipScreen } from '../screens/Relationship';
import { SkillScreen } from '../screens/Skill';
import { TabBar } from './components/Tabbar';

const Tab = createBottomTabNavigator();

export const TabRoute = () => {
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        headerShown: false,
        // tabBarBackground: () => (
        //   <View style={{ backgroundColor: 'transparent', width: '100%' }} />
        // ),
        tabBarStyle: {
          backgroundColor: 'red',
          position: 'absolute',
          height: 100,
        },
      }}
      tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name="Occupation" component={OccupationScreen} />
      <Tab.Screen name="Education" component={EducationScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Relationship" component={RelationshipScreen} />
      <Tab.Screen name="Skill" component={SkillScreen} />
    </Tab.Navigator>
  );
};
