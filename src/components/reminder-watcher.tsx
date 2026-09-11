import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { todayISO } from "@/lib/utils";
import { armDailyReminder } from "@/lib/reminders";
import { warmVoices } from "@/lib/speech";

export function ReminderWatcher() {
  const reminderEnabled = useAppStore((s) => s.reminderEnabled);
  const reminderTime = useAppStore((s) => s.reminderTime);
  const childName = useAppStore((s) => s.childName);
  const dailyDone = useAppStore((s) => s.dailyDone);

  useEffect(() => {
    warmVoices();
  }, []);

  useEffect(() => {
    if (!reminderEnabled) return;
    const practiced = dailyDone.includes(todayISO());
    armDailyReminder(reminderTime, childName, practiced);
  }, [reminderEnabled, reminderTime, childName, dailyDone]);

  return null;
}
