import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JobsListScreen from "../screens/jobListScreen";
import JobDetailScreen from "../screens/jobDetailScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Jobs" component={JobsListScreen} />
      <Stack.Screen name="Detail" component={JobDetailScreen} />
    </Stack.Navigator>
  );
}