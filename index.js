
function createEmployeeRecord(record) {
    
    const employeeRecords = {
    firstName: record[0],
    familyName:record[1],
    title: record[2],
    payPerHour: record[3],
    timeInEvents: [],
    timeOutEvents: []
}
return employeeRecords
    
    }

    function createEmployeeRecords(employee){
       return employee.map(employee => createEmployeeRecord(employee))
    }

    function createTimeInEvent(employee, dateStamp) {
        let [date, hour] = dateStamp.split(" ")
        let eventObj= {
            type: "TimeIn",
            hour: parseInt(hour, 10),
            date

        }
        employee.timeInEvents.push(eventObj)
        return employee
            }


      function createTimeOutEvent(employee, dateStamp)  {
        let [date, hour] = dateStamp.split(" ")
        let eventObj= {
            type: "TimeOut",
            hour: parseInt(hour, 10),
            date
      } 
      employee.timeOutEvents.push(eventObj)
      return employee

     }
    function hoursWorkedOnDate(employee, dateStamp) {
    const timeIn = employee.timeInEvents.find(employee=> employee.date === dateStamp)
    const timeOut = employee.timeOutEvents.find(employee => employee.date === dateStamp)
    //console.log("timeIn", timeIn)

    return (timeOut.hour - timeIn.hour)/100

}

    function wagesEarnedOnDate(employee, dateStamp) {
        const hours = hoursWorkedOnDate(employee, dateStamp)
        const payHours = employee.payPerHour*hours
        return  parseFloat(payHours.toString())
    }

     const allWagesFor = function(employee) {
        const eligibleDates = employee.timeInEvents.map(function (e) {
            return e.date
        })
        const payable = eligibleDates.reduce((memo, record) => memo + wagesEarnedOnDate(employee, record), 0)
        //console.log(payable) 
        return payable
     }

     

    function calculatePayroll (employeeRecords) {
        //console.log(employeeRecords)
        return employeeRecords.reduce((accumulator, employee) => accumulator + allWagesFor(employee),0)
        
    }