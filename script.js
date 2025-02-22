const Week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function convertTo24Hour(time) {
    let [hourMinute, ampm] = time.split(" ");
    let [hours, minutes] = hourMinute.split(":").map(Number);

    if (ampm === "PM" && hours !== 12) hours += 12;
    if (ampm === "AM" && hours === 12) hours = 0;

    return { hours, minutes };
}

function getgridRow(time) {
    let { hours, minutes } = convertTo24Hour(time);
    return (hours * 2) + (minutes / 30) + 2;
}

function addtasktoCalender(task) {
    let startRow = getgridRow(task.start);
    let endRow = getgridRow(task.end) + 1;
    let column = Week.indexOf(task.day) + 2;

    if (column < 2) {
        console.error(`Error: Invalid day '${task.day}'`);
        return;
    }

    console.log(`${task.text} (${task.start} - ${task.end}): Start Row: ${startRow}, End Row: ${endRow}`);

    let taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.style.gridRowStart = startRow;
    taskElement.style.gridRowEnd = endRow;
    taskElement.style.gridColumn = column;
    taskElement.style.backgroundColor = task.color;
    taskElement.textContent = task.text;

    document.querySelector(".calendar").appendChild(taskElement);
}

// Fetch tasks from a file instead of hardcoding
fetch("tasks.json")
    .then(response => response.json())
    .then(tasks => {
        tasks.forEach(addtasktoCalender);
    })
    .catch(error => console.error("Error loading tasks:", error));
