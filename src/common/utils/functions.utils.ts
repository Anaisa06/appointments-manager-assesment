import { addHours, format, parse, subHours } from "date-fns"

export const getHoursInRange = (startTime: string, endTime: string) => {
    const start = parse(startTime, 'HH:mm', new Date());
    const end = subHours(parse(endTime, 'HH:mm', new Date()), 1); //extract one hour from the shift end, that will be the last available appointment;

    const timeList: string[] = [];

    let currentTime = start;

    while(currentTime <= end) {
        timeList.push(format(currentTime, 'HH:00'));
        currentTime = addHours(currentTime, 1);
    }

    return timeList;
}
