const firebaseConfig = {
  apiKey: "AIzaSyCLTg7DBhPIUa_7pxXRyx4l-cEgpcGtAi4",
  authDomain: "todo-list-60000.firebaseapp.com",
  databaseURL: "https://todo-list-60000.firebaseio.com",
  projectId: "todo-list-60000",
  storageBucket: "todo-list-60000.appspot.com",
  messagingSenderId: "219540524205",
  appId: "1:219540524205:web:73ba494e53035b0d390a24",
  measurementId: "G-6KZNCMEGX1"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const d = new Date();
const t = d.getTime();
let counter = t;
reset();

document.getElementById("formanlegen").addEventListener("submit", (e) => {
  const task = document.getElementById("todo").value;
  const prozent = document.getElementById("prozent").value;
  const deadlinezsm = document.getElementById("deadlinezsm").value;
  e.preventDefault();
  createTask(task, prozent, deadlinezsm);
  formanlegen.reset();
});

function createTask(tasktext, prozent, deadlinezsm) {
  console.log(counter);
  counter += 1;
  console.log(counter);
  const task = {
    id : counter,
    task : tasktext,
    prozent : prozent,
    deadlinezsm : deadlinezsm
  }
  let db = firebase.database().ref("tasks/" + counter);
  db.set(task);
}

function reset() {
  document.getElementById("formanlegen").innerHTML = `
  <div class="form-group">
    <label class="text-dark" for="todo">TODO Text</label>
    <input class="form-control form-control-sm" id="todo" placeholder="Gib hier dein TODO ein. Es darf maximal 160 Zeichen enthalten." type="text" maxLength="160">
  </div>
  <div class="form-group" id="prozenttext">
    <label class="text-dark" for="prozent">Fortschritt</label>
    <input class="form-control form-control-sm" id="prozent" placeholder="Wie viel % hast du bereits geschafft?"
           type="text">
  </div>
  <div class="form-group">
    <label class="text-dark" for="deadlinezsm">Deadline</label>
    <input class="form-control form-control-sm" id="deadlinezsm"
           type="datetime-local">
  </div>
  <button class="btn btn-success" id="buttonanlegen" type="submit">Speichern</button>
  `;
}
