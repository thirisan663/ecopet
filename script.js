const habitInput = document.getElementById("habitInput");
const addHabit = document.getElementById("addHabit");
const habitList = document.getElementById("habitList");
const pointsText = document.getElementById("points");
const pet = document.getElementById("pet");
const petStatus = document.getElementById("petStatus");
const feedBtn = document.getElementById("feedBtn");

let habits = JSON.parse(localStorage.getItem("habits")) || [];
let points = Number(localStorage.getItem("points")) || 0;
let hungry = true;

pointsText.textContent = points;
renderHabits();

addHabit.addEventListener("click", () => {
  if(habitInput.value){
    habits.push(habitInput.value);
    habitInput.value = "";
    save();
    renderHabits();
  }
});

function renderHabits(){
  habitList.innerHTML = "";

  habits.forEach((h, i) => {
    const li = document.createElement("li");
    li.textContent = h;

    const btn = document.createElement("button");
    btn.textContent = "✅";

    btn.onclick = () => {
      points += 10;
      pointsText.textContent = points;
      habits.splice(i,1);
      hungry = true;
      updatePet();
      save();
      renderHabits();
    };

    li.appendChild(btn);
    habitList.appendChild(li);
  });
}

feedBtn.addEventListener("click", () => {
  if(points >= 20){
    points -= 20;
    hungry = false;
    updatePet();
    pointsText.textContent = points;
    save();
  } else {
    alert("Not enough points!");
  }
});

function updatePet(){
  if(hungry){
    pet.textContent = "😿";
    petStatus.textContent = "Hungry";
  } else {
    pet.textContent = "😺";
    petStatus.textContent = "Happy";
  }
}

function save(){
  localStorage.setItem("habits", JSON.stringify(habits));
  localStorage.setItem("points", points);
}
