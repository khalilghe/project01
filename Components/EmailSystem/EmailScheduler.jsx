import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function EmailScheduler({ onSchedule }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    updateScheduledDateTime(e.target.value, selectedTime);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
    updateScheduledDateTime(selectedDate, e.target.value);
  };

  const updateScheduledDateTime = (date, time) => {
    if (date && time) {
      const scheduledDateTime = new Date(`${date}T${time}`);
      onSchedule(scheduledDateTime);
    }
  };

  // Get current date and time in local format for min attribute
  const now = new Date();
  const currentDate = now.toISOString().split('T')[0];
  const currentTime = now.toTimeString().slice(0,5);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            type="date"
            id="date"
            value={selectedDate}
            onChange={handleDateChange}
            min={currentDate}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="time">Time</Label>
          <Input
            type="time"
            id="time"
            value={selectedTime}
            onChange={handleTimeChange}
            min={selectedDate === currentDate ? currentTime : undefined}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

