var firebaseConfig = {
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

  var d = new Date();
  var t = d.getTime();
  var counter =t;

  document.getElementById("formanlegen").addEventListener("submit",(e)=>{
    var task = document.getElementById("todo").value;
    var deadline = document.getElementById("deadline").value;
    var prozent = document.getElementById("prozent").value;
    var deadlinetime = document.getElementById("deadlinetime").value;
    e.preventDefault();
    createTask(task,deadline,prozent,deadlinetime);
    formanlegen.reset();
  });


  function createTask(tasktext,deadline,prozent,deadlinetime){
    console.log(counter);
    counter+=1;
    console.log(counter);
    var task={
      id:counter,
      task: tasktext,
      deadline:deadline,
      prozent:prozent,
      deadlinetime:deadlinetime
    }
    let db= firebase.database().ref("tasks/"+counter);
    db.set(task);
    //document.getElementById("cardSection").innerHTML='';
    //readTask();
  }
  function reset(){
    document.getElementById("formanlegen").innerHTML=`
    <div class="form-group">
                    <label class = "text-dark"for="todo">TODO Text</label>
                    <input type="text" id="todo" placeholder="Enter TODO Text" class="form-control form-control-sm">
        
                </div>
                <div class="form-group">
                    <label class = "text-dark" for="deadline">Deadline</label>
                    <input type="text" id="deadline" placeholder="Enter Deadline" class="form-control form-control-sm">
    
                </div>
                <div class="form-group" id="prozenttext">
                    <label class = "text-dark" for="prozent">Prozent</label>
                    <input type="text" id="prozent" placeholder="Enter Prozent" class="form-control form-control-sm">
                    
                </div>
                
                <button type="submit" class="btn btn-success" id="buttonanlegen">Submit</button>
    `;
  
  }
  function readTask(){
    var task= firebase.database().ref("tasks/");
    task.on("child_added",function(data){
      var taskValue= data.val();
  
      document.getElementById("TODOS").innerHTML+=`
      <div class="row">
      <div class="col-xl-10">
          <div class="card shadow border-left-primary py-2">
              <div class="row align-items-center no-gutters">
                  <div class="col-9 col-sm-9 col-md-9 col-lg-9 mr-2">
                      <div class="text-uppercase text-primary font-weight-bold text-xs mb-1"><span>&nbsp;hausaufgabe in sksy&nbsp;</span></div>
                      <div class="text-dark font-weight-bold h5 mb-0"></div>
                  </div><i class="fas fa-edit fa-1x text-gray-300"></i><i class="fas fa-trash-alt fa-1x text-gray-300"></i></div>
              <div class="card-body">
                  <div class="col-auto">
                      <div class="text-dark font-weight-bold h5 mb-0 mr-3"><span></span>
                          <div class="row no-gutters align-items-center">
                              <div class="col">
                                  <div class="progress">
                                      <div class="progress-bar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width: 50%;">50%</div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="card-body">
                  <p><i class="fas fa-calendar fa-1x text-gray-300"></i>&nbsp;8.05.2020&nbsp;<i class="fas fa-clock fa-1x text-gray-300"></i>&nbsp;17:00</p>
              </div>
          </div>
      </div>
  </div>
    `
    });  
  }