let container = document.querySelector('.container');
container.classList.add('container');
let circles = [];
let roomes = [];
let room = document.querySelectorAll('.room');
let innerCircles = []

// making 11 roomes
for (let i = 0; i <= 11; i++) {
    let room = document.createElement('section');
    room.classList.add('room')
    container.append(room);
    roomes.unshift(room);

    // making 5 circles
    for (let j = 0; j < 4; j++) {
        let circle = document.createElement('div')
        circle.classList.add('circle')
        circles.unshift(circle);
        room.append(circles[i])
    }
}
// making random colors for circles
let colors = ['green', 'red', 'blue', 'yellow', 'orange', 'cyan'];
let allCircles = document.querySelectorAll('.circle');
allCircles.forEach((Element) => {
    let color = Math.floor(Math.random() * colors.length);
    Element.style.backgroundColor = colors[color]
})
// making shadow for every circle(with same color of circle)
for (let i = 0; i < allCircles.length; i++) {
    let backgroundColor = allCircles[i].style.backgroundColor;
    allCircles[i].style.boxShadow = `2px 2px 10px ${backgroundColor}`
}
allCircles.forEach(element => {
    element.addEventListener('click', (eventObject) => {
        if (!eventObject.currentTarget() === eventObject.target()) {
            console.log('ok');
        }
    })
});

// store selected circle
let selectedCircle = null;

// click on circle
allCircles.forEach(element => {
    element.addEventListener('click', (eventObject) => {

        let clickedCircle = eventObject.currentTarget; // ❤️ fixed (was function call)

        // if no circle selected → select it
        if (!selectedCircle) {
            selectedCircle = clickedCircle;
            selectedCircle.style.border = '3px solid white'; // highlight
            return;
        }

        // if already selected → try move
        let fromRoom = selectedCircle.parentElement;
        let toRoom = clickedCircle.parentElement;

        // get colors
        let selectedColor = selectedCircle.style.backgroundColor;
        let targetColor = clickedCircle.style.backgroundColor;

        // rule: only move if colors match
        if (selectedColor === targetColor) {
            toRoom.append(selectedCircle); // move

            // remove highlight
            selectedCircle.style.border = 'none';
            selectedCircle = null;

            checkWin(); // check game win
        } else {
            // not allowed → reset selection
            selectedCircle.style.border = 'none';
            selectedCircle = null;
        }
    })
});


// win function
function checkWin() {
    let rooms = document.querySelectorAll('.room');

    let win = true;

    rooms.forEach(room => {
        let circles = room.querySelectorAll('.circle');

        if (circles.length === 0) return;

        let firstColor = circles[0].style.backgroundColor;

        // check if all same color
        circles.forEach(circle => {
            if (circle.style.backgroundColor !== firstColor) {
                win = false;
            }
        });
    });

    if (win) {
        alert('HI SAQIB YOU WON THE GAME🐒');
    }
}