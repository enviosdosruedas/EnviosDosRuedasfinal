export const generateTimeSlots = (startHour: number, endHour: number, interval: number): string[] => {
    const slots: string[] = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        if (hour === endHour && minute > 0) continue;
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        slots.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    return slots;
  };
  
  export const deliveryStartTimes = generateTimeSlots(9, 17, 30);
  export const allDeliveryTimes = generateTimeSlots(9, 19, 30);
  