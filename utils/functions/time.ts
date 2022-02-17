export const convertMinuteToDate = (min: number) => {
    // 550 -> '09', '50'
    let hour, minute;

    minute = min % 60;
    hour = (min - minute) / 60;

    return {
        hour,
        minute,
        hourToString: hour < 10 ? `0${hour}` : hour.toString(),
        minuteToString: minute < 10 ? `0${minute}` : minute.toString(),
    }
}

export const hasExpired = (timestamp: number | undefined) => {
    return timestamp && timestamp <= Date.now()
}