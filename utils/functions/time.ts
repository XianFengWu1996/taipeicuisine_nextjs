import {DateTime} from 'luxon'
import store from '../../store/store';

export const date = DateTime.now().setZone("America/New_York");
export const currentMinute = (date.hour * 60) + date.minute
export const isLunchTime = currentMinute >= process.env.NEXT_PUBLIC_LUNCH_START  && currentMinute <= process.env.NEXT_PUBLIC_LUNCH_END

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

export const hasExpired = (timestamp: number) => {
    return timestamp <= Date.now()
}

// date formatting
export const format_date = (timestamp:number, format?: string) => {
    return DateTime.fromMillis(timestamp).toFormat(format ?? 'LLL dd, y T');
}

// check if the store is currently open
export const isStoreOpen = () => {
    // find the regular hour for the day
    let regular_hour = store.getState().store.hours.regular_hour.find((hours) => {
        return hours.day_of_week.toLowerCase() === date.weekdayLong.toLowerCase();
    })

    // check if the current minute is between the open and close hour
    // return true means store is currently open
    // return false means store is currently close
    if(regular_hour){
        return currentMinute >= regular_hour.open_hour && currentMinute <= regular_hour.close_hour
    }
}
