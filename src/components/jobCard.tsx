import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Job } from "../types/job";
import { COLORS } from "../constants/colors";

export default function JobCard({
  job,
  onPress,
}: {
  job: Job;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.title}>{job.title}</Text>
        <View style={[styles.badge, styles[job.status]]}>
          <Text>{job.status}</Text>
        </View>
      </View>

      <Text style={styles.time}>{job.time}</Text>
      <Text style={styles.area}>{job.area}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 16,
    marginVertical: 8,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },
  time: {
    marginTop: 6,
    color: "#666",
  },
  area: {
    color: "#999",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  pending: { backgroundColor: COLORS.pending },
  in_progress: { backgroundColor: COLORS.in_progress },
  completed: { backgroundColor: COLORS.completed },
});