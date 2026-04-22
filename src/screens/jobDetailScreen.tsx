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

  const isCompleted = job.status === "completed";

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
      <View style={styles.card}>
        {/* Title */}
        <Text style={styles.title}>{job.title}</Text>

        {/* Status Badge */}
        <View
          style={[
            styles.badge,
            { backgroundColor: isCompleted ? "#d4edda" : "#fff3cd" },
          ]}
        >
          <Text
            style={{
              color: isCompleted ? "#155724" : "#856404",
              fontWeight: "600",
            }}
          >
            {job.status.toUpperCase()}
          </Text>
        </View>

        {/* Info */}
        <Text style={styles.label}>🕒 Time</Text>
        <Text style={styles.value}>{job.time}</Text>

        <Text style={styles.label}>📍 Area</Text>
        <Text style={styles.value}>{job.area}</Text>

        {!isCompleted ? (
          <>
            {/* Input */}
            <Text style={styles.label}>📝 Add Note</Text>
            <TextInput
              placeholder="Write completion note..."
              value={note}
              onChangeText={setNote}
              style={styles.input}
              multiline
            />

            {/* Button */}
            <TouchableOpacity
              style={[
                styles.button,
                note.length < 5 && { backgroundColor: "#ccc" },
              ]}
              onPress={handleComplete}
              disabled={note.length < 5}
            >
              <Text style={styles.buttonText}>✔ Mark Complete</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.completedBox}>
            <Text style={styles.completedLabel}>Completed Note</Text>
            <Text style={styles.completedText}>{job.note}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 15,
  },
  label: {
    fontSize: 13,
    color: "#888",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    marginTop: 8,
    padding: 12,
    borderRadius: 12,
    minHeight: 80,
    textAlignVertical: "top",
    backgroundColor: "#fafafa",
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 16,
    marginTop: 20,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
  completedBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#e9f7ef",
    borderRadius: 12,
  },
  completedLabel: {
    fontSize: 13,
    color: "#2e7d32",
    marginBottom: 5,
  },
  completedText: {
    fontSize: 15,
    fontWeight: "500",
  },
});