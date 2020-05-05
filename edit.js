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
  

  var d = new Date();
  var t = d.getTime();
  var counter =t;
  readTask();
  function readTask(){
    var task= firebase.database().ref("tasks/");
    task.on("child_added",function(data){
      var taskValue= data.val();
  
      document.getElementById("editText").innerHTML+=`
      <div class="row">
      <div class="col-xl-10">
          <div class="card shadow border-left-primary py-2">
              <div class="row align-items-center no-gutters">
                  <div class="col-9 col-sm-9 col-md-9 col-lg-9 mr-2">
                      <div class="text-uppercase text-primary font-weight-bold text-xs mb-1"><span>&nbsp;${taskValue.task}&nbsp;</span></div>
                      <div class="text-dark font-weight-bold h5 mb-0"></div>
                  </div><i class="fas fa-edit fa-1x text-gray-300"></i><i class="fas fa-trash-alt fa-1x text-gray-300"></i></div>
              <div class="card-body">
                  <div class="col-auto">
                      <div class="text-dark font-weight-bold h5 mb-0 mr-3"><span></span>
                          <div class="row no-gutters align-items-center">
                              <div class="col">
                                  <div class="progress">
                                      <div class="progress-bar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width: ${taskValue.prozent}%;">${taskValue.prozent}%</div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="card-body">
                  <p><i class="fas fa-calendar fa-1x text-gray-300"></i>&nbsp;${taskValue.deadlinezsm.split("T")[0]}&nbsp;<i class="fas fa-clock fa-1x text-gray-300"></i>&nbsp;${taskValue.deadlinezsm.split("T")[1]}</p>
              </div>
          </div>
      </div>
  </div>
              <button type="submit" style="color:white" class="btn btn-warning" onclick="updateTask(${taskValue.id},'${taskValue.task}','${taskValue.prozent}','${taskValue.deadlinezsm}')"><i class="fas fa-edit"></i>Task bearbeiten</button>
          <button type="submit"  class="btn btn-danger" onclick="deleteTask(${taskValue.id})"><i class="fas fa-trash-alt"></i>Task Löschen</button>
          </div>
      </div>
  </div>
    `
    
    });  
  }
  function updateTask(id,task,prozent,deadlinezsm){
    document.getElementById("editText").innerHTML=`
    <form id="formanlegen">
                <div class="form-group">
                    <label class = "text-dark"for="todo">TODO Text</label>
                    <input type="text" id="todo" placeholder="Gib hier dein TODO ein." class="form-control form-control-sm">
        
                </div>
                
                <div class="form-group" id="prozenttext">
                    <label class = "text-dark" for="prozent">Fortschritt</label>
                    <input type="text" id="prozent" placeholder="Wie viel hast du bereits geschafft?" class="form-control form-control-sm">
                    
                </div>
                <div class="form-group">
                    <label class = "text-dark" for="deadlinezsm">Deadline</label>
                    <input type="text" id="deadlinezsm" placeholder="Gib hier das Deadlinedatum und die Deadlineuhrzeit(zB 22.10.2020T22:00)" class="form-control form-control-sm">
                    
                </div>
  

    <button type="submit" style="display: inline-block" id="button2" class="btn btn-success"><i class="fas fa-sync"></i>Task Bearbeiten</button>
    <button style="display: inline-block" id="button3" class="btn btn-danger"><i class="fas fa-ban"></i> stornieren</button>
  </form>
    `;
    
    document.getElementById("button3").addEventListener("click",(e)=>{
      reset();
    });
    document.getElementById("button2").addEventListener("click",(e)=>{
      updateTask2(id,document.getElementById("todo").value,document.getElementById("prozent").value,document.getElementById("deadlinezsm").value);
    });
    document.getElementById("todo").value=task;
    document.getElementById("prozent").value=prozent;
    document.getElementById("deadlinezsm").value=deadlinezsm;
  }
  
  function updateTask2(id,task,prozent,deadlinezsm){
    var taskUpdated={
      id:id,
      task:task,
      prozent:prozent,
      deadlinezsm:deadlinezsm
    }
    let db= firebase.database().ref("tasks/"+id);
    db.set(taskUpdated);
    
  
    reset();
  }
  function deleteTask(id){
    var task= firebase.database().ref("tasks/"+id);
    task.remove();
    reset();
    
  }
  function reset(){
    document.getElementById("editText").innerHTML='';
    readTask();
  }
  function deleteTask(id){
    var task= firebase.database().ref("tasks/"+id);
    task.remove();
    reset();
    
  }