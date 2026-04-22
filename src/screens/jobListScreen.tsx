import { useState, useCallback } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getJobs } from "../api/jobApi";
import JobCard from "../components/jobCard";
import { Job } from "../types/job";
import { COLORS } from "../constants/colors";

export default function JobsListScreen({ navigation }: any) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await getJobs();
      setJobs(data);
    } catch (e) {
      console.log("API ERROR:", e);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 AUTO REFRESH when screen comes back
  useFocusEffect(
    useCallback(() => {
      fetchJobs();
    }, [])
  );

  if (loading)
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  if (jobs.length === 0)
    return <Text style={styles.empty}>No jobs found</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <JobCard
            job={item}
            onPress={() => navigation.navigate("Detail", { job: item })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.background,
  },
  empty: {
    textAlign: "center",
    marginTop: 50,
  },
});