info = ["Jh0n", "D0a", "BOSS", 25];

function createEmployeeRecord(info) {
    return {
        "firstName" : info[0],
        "familyName" : info[1],
        "title" : info[2],
        "payPerHour" : info[3],
        "timeInEvents" : [],
        "timeOutEvents" : [],
    };
}

arrayInfo = [info, info, info, info, info];

function createEmployeeRecords(arrayInfo) {
    const newArrInfo = arrayInfo.map((each) => createEmployeeRecord(each));
    return newArrInfo;
}

const recordsArray = createEmployeeRecords(arrayInfo);

const date = "1485-10-29 1400";

function createTimeInEvent(record, date) {
    record.timeInEvents.unshift({
        "type" : "TimeIn",
        "hour" : Number(date.slice(11, 15)),
         "date" : date.slice(0, 10),
    });
    
    return record;
}

function createTimeOutEvent(record, date) {
    record.timeOutEvents.unshift({
        "type" : "TimeOut",
        "hour" : Number(date.slice(11, 15)),
        "date" : date.slice(0, 10),
    });
    
    return record;
}

function hoursWorkedOnDate(record, theDate) {
    const timeInEvent = record.timeInEvents.find((event) => event.date === theDate);
    const timeOutEvent = record.timeOutEvents.find((event) => event.date === theDate);

    if (timeInEvent && timeOutEvent) {
        return (timeOutEvent.hour - timeInEvent.hour) / 100;
    }
}

function wagesEarnedOnDate(record, date) {
    const hoursWorked = hoursWorkedOnDate(record, date);
    const wage = hoursWorked * record.payPerHour;
    return wage;
}

function allWagesFor(record) {
    const all = record.timeInEvents.map((obj) => obj.date);
    const reduced = all.reduce((acc, curr) => acc + wagesEarnedOnDate(record, curr), 0);
    return reduced;
}

function calculatePayroll(arrayInfo) {
    const allWages = arrayInfo.map((rec) => allWagesFor(rec));
    const total = allWages.reduce((acc, curr) => acc + curr, 0);
    return total;
}

const totalPayroll = calculatePayroll(recordsArray);


