// MAIN IMPORTS
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useColors } from './src/util/hooks';
// THEMES
import LightTheme from './src/themes/LightTheme.json';
import DarkTheme from './src/themes/DarkTheme.json';
// SCREENS
import LoginScreen from './src/screens/Login/login.screen';
import SignupScreen from './src/screens/Signup/signup.screen';
import HomeScreen from './src/screens/Home/home.screen';
import ActivitiesScreen from './src/screens/Activities/activities.screen';
import CalendarView from './src/screens/Calendar/calendar.screen';
import ShadesScreen from './src/screens/Shades/shades.screen';
import ReportScreen from './src/screens/Report/report.screen';
// COMPONENTS
import IconNav from './src/components/iconNav.component';
import CustomDrawer from './src/components/customDrawer';
import Toast from 'react-native-toast-message';
// SERVICES
import { Service_API } from './src/services/api.service';

function DummyComponent(props){
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text >{props.route.params.screenName}</Text>
    </View>
  )
}
// STACKS
const HomeStack = createStackNavigator();
const ReportStack = createStackNavigator();
const ActivityStack = createStackNavigator();
const CalendarStack = createStackNavigator();
const AuthStack = createStackNavigator();

function CommonStackOptions(){
  return {
    headerShown: false
  }
}

function _HomeStack(){
  return (
    <HomeStack.Navigator screenOptions={CommonStackOptions()}>
      <HomeStack.Screen name="Screen1" component={HomeScreen}/>
    </HomeStack.Navigator>
  )
}

function _ReportStack(){
  return (
    <ReportStack.Navigator screenOptions={CommonStackOptions()}>
      <ReportStack.Screen name="Screen1" component={ReportScreen}/>
    </ReportStack.Navigator>
  )
}

function _ActivityStack(){
  return (
    <ActivityStack.Navigator screenOptions={CommonStackOptions()}>
      <ActivityStack.Screen name="Screen1" component={ActivitiesScreen}/>
    </ActivityStack.Navigator>
  )
}

function _CalendarStack(){
  return (
    <CalendarStack.Navigator screenOptions={CommonStackOptions()}>
      <CalendarStack.Screen name="Screen1" component={CalendarView}/>
    </CalendarStack.Navigator>
  )
}

function _AuthStack(props){
  function makeitLogged(){
    props.handlerLogin(true);
  }
  return (
    <AuthStack.Navigator screenOptions={CommonStackOptions()}>
      <AuthStack.Screen name="Screen1" children={(props)=>(
        <LoginScreen {...props} handlerLogin={makeitLogged}/>
      )}/>
      <AuthStack.Screen name="Screen2" component={SignupScreen}/>
    </AuthStack.Navigator>
  )
}

// DRAWER
const Drawer = createDrawerNavigator();

function _Drawer(props){
  const { handlerTheme } = props;
  const { colors, dark } = useTheme();
  return (
    <Drawer.Navigator 
      drawerContent={({ navigation })=>(
        <CustomDrawer 
          manageTheme={handlerTheme} 
          openShades={()=>{navigation.navigate('Screen2')}}
          openHome={()=>navigation.navigate('Screen1')}
        />
      )}
    >
      <Drawer.Screen name="Screen1" component={_BottomTabs}/>
      <Drawer.Screen name="Screen2" component={ShadesScreen}/>
    </Drawer.Navigator>
  )
}
// BOTTOM TAB
const BottomTabs = createBottomTabNavigator();
function _BottomTabs(){
  const { colors, dark } = useColors();
  return (
    <BottomTabs.Navigator tabBarOptions={{ showLabel: false, keyboardHidesTabBar: true }}>
      <BottomTabs.Screen name="Home" component={_HomeStack} options={{
        tabBarIcon: ({ color, focused })=><IconNav color={color} focused={focused} screenName={"Home"}/>
      }}/>
      <BottomTabs.Screen name="Report" component={_ReportStack} options={{
        tabBarIcon: ({ color, focused })=><IconNav color={color} focused={focused} screenName={"Report"}/>
      }}/>
      <BottomTabs.Screen name="Activity" component={_ActivityStack} options={{
        tabBarIcon: ({ color, focused })=><IconNav color={color} focused={focused} screenName={"Activity"}/>
      }}/>
      <BottomTabs.Screen name="Calendar" component={_CalendarStack} options={{
        tabBarIcon: ({ color, focused })=><IconNav color={color} focused={focused} screenName={"Calendar"}/>
      }}/>
    </BottomTabs.Navigator>
  )
}

export default function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [hideStatusBar, setHideStatusBar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scheme, setScheme] = useState('dark');
  const [isFontLoaded, error] = useFonts({
    'FiraSans-Black': require('./assets/fonts/Lato/Lato-Black.ttf'),
    'FiraSans-Bold': require('./assets/fonts/Lato/Lato-Bold.ttf'),
    'FiraSans-SemiBold': require('./assets/fonts/Lato/Lato-Semibold.ttf'),
    'FiraSans-Light': require('./assets/fonts/Lato/Lato-Light.ttf'),
    'FiraSans-Medium': require('./assets/fonts/Lato/Lato-Regular.ttf')
  });

  useEffect(()=>{
    async function getToken(){
      const response = await Service_API.loadJWTToken();
      if (response) setIsLogged(true);
    }
    getToken();
    Service_API.setBackToLogin(()=>{setIsLogged(false)});
  });

  function useIsLogged(){
    setIsLogged(true);
  } 

  return (
    <>
    <NavigationContainer theme={scheme === 'light' ? DarkTheme : LightTheme}>
      <StatusBar hidden={hideStatusBar} animated={true} style={scheme === "dark" ? 'light' : 'dark'}/>
      {isFontLoaded && (
        <>
          {isLogged && (
            <SafeAreaView style={{ flex: 1 }}>
              <_Drawer handlerTheme={setScheme}/>
            </SafeAreaView>
          )}
          {!isLogged && (
            <_AuthStack handlerLogin={useIsLogged}/>
          )}
        </>        
      )}
    </NavigationContainer>
    <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
