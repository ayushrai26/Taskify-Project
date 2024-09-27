const start = document.getElementById('start');
start.addEventListener('click', add);

function add() {
    const text = document.getElementById('text');
    const values = text.value;
    const num = document.getElementById('number');
    const nums = parseInt(num.value); // Timer input (in seconds)

    if (values && nums) {
        let realTime, elapsedtime = 0;
        let value, real;

        const timer = document.createElement('img');
        const divi = document.getElementById('divi');
        const li = document.createElement('li');
        const stop = document.createElement('button');
        const newdiv = document.createElement('div');
        const inStart = document.createElement('button');
        inStart.textContent = 'START';
        stop.textContent = 'STOP';

        timer.src = 'https://static.vecteezy.com/system/resources/previews/000/583/361/original/timer-icon-vector.jpg';
        timer.width = 20;
        const div = document.createElement('div');
        
        // Function to format time in hh:mm:ss
        function timeto(time) {
            let hh = (time / 3600000);
            let rhh = Math.floor(hh);
            let mm = (hh - rhh) * 60;
            let rmm = Math.floor(mm);
            let ss = (mm - rmm) * 60;
            let rss = Math.floor(ss);
            let h = rhh.toString().padStart(2, "0");
            let m = rmm.toString().padStart(2, "0");
            let s = rss.toString().padStart(2, "0");
            return `${h}:${m}:${s}`;
        }

        // Start the stopwatch timer
        function startTimer() {
            realTime = Date.now() - elapsedtime;
            const interval = setInterval(() => {
                elapsedtime = Date.now() - realTime;
                div.textContent = timeto(elapsedtime);

                // If the timer reaches the inputted time (in ms), stop and show "Time Completed"
                if (elapsedtime >= nums * 1000) {
                    clearInterval(interval);
                    div.textContent = `Time completed: ${timeto(elapsedtime)}`;
                }
            }, 1000);

            // Stop button logic to clear the interval
            stop.addEventListener('click', function () {
                clearInterval(interval);
            });

            // Start button (in case we want to start again)
            inStart.addEventListener('click', function () {
                realTime = Date.now() - elapsedtime;
                startTimer();
            });
        }

        timer.addEventListener('click', function () {
            newdiv.appendChild(inStart);
            newdiv.appendChild(stop);
            startTimer(); // Start the timer when the timer image is clicked
        });

        li.textContent = `${values} within ${nums}s`;
        const button = document.createElement('button');
        button.textContent = 'Remove';
        li.appendChild(button);
        li.appendChild(timer);
        li.appendChild(div);
        li.appendChild(newdiv);
        divi.appendChild(li);

        text.value = '';
        num.value = '';

        button.addEventListener('click', function () {
            divi.removeChild(li);
        });

    } else if (!nums) {
        alert('Enter a valid number for the timer');
    }
}
