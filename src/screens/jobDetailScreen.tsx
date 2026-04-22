import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import { markComplete } from "../api/jobApi";
import { COLORS } from "../constants/colors";

export default function JobDetailScreen({ route, navigation }: any) {
  const { job } = route.params;
  const [note, setNote] = useState("");

  const handleComplete = async () => {
    if (note.length < 5) {
      Alert.alert("Error", "Note must be at least 5 characters");
      return;
    }

    await markComplete(job.id, note);
    Alert.alert("Success", "Job completed");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{job.title}</Text>
      <Text>{job.time}</Text>
      <Text>{job.area}</Text>

      {job.status !== "completed" ? (
        <>
          <TextInput
            placeholder="Enter note"
            value={note}
            onChangeText={setNote}
            style={styles.input}
          />

          <TouchableOpacity style={styles.button} onPress={handleComplete}>
            <Text style={styles.buttonText}>Mark Complete</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>Completed: {job.note}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: "bold" },
  input: {
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 14,
    marginTop: 20,
    borderRadius: 12,
  },
  buttonText: { color: "#fff", textAlign: "center" },
});