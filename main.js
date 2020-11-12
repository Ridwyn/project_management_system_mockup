
var data = [
    { link: "/dashboard.html", text: "Dashboard" },
    { link: "/staffRecords.html", text: "Staff Records" },
    { link: "/courseRecords.html", text: "Course Records" },
    { link: "/studentRecords.html", text: "Student Records" },
    { link: "/bookClassroom.html", text: "BookClassroom" },
    { link: "/checkReservations.html", text: "Check Reservation" },
    { link: "/attendanceRecords.html", text: "Attendance Records" },
    { link: "/searchResult.html", text: "Search Result" }
  ];

  var statuses=[
    {"name":"open","index":"1","color":"gray"},
    {"name":"planned","index":"2","color":"yellow"},
    {"name":"in_progress","index":"3" ,"color":"blue"},
    {"name":"qc","index":"4", "color":"violet"},
    {"name":"closed","index":"5", "color":"green"},
  ]

  var projects=[
    {"project":{"id":"p1", "name":"project1",
      "tasks":[ {"task":{"id":"p1t1", "status":{"status":"in_progress","color":"blue"},"tags":["sprint1","sprint2","bugs"]}},
                {"task":{"id":"p1t2", "status":{"status":"open","color":"gray"},"tags":["sprint1","sprint2","bugs"]}},
                {"task":{"id":"p1t2", "status":{"status":"qc","color":"violet"},"tags":["sprint1","sprint2","bugs"]}},
              ]        
      }
    },
    {"project":{"id":"p2", "name":"project2",
      "tasks":[ {"task":{"id":"p2t1", "status":{"status":"planned","color":"yellow"}}},
              ]        
      }
    },
    {"project":{"id":"p3", "name":"project3",
      "tasks":[ {"task":{"id":"p3t1", "status":{"status":"planned","color":"yellow"}}},
                {"task":{"id":"p3t2", "status":{"status":"closed","color":"green"}}},
                {"task":{"id":"p3t3", "status":{"status":"open","color":"gray"}}},
              ]        
      }
    },
    {"project":{"id":"p4", "name":"project4",
      "tasks":[ {"task":{"id":"p4t1", "status":{"status":"in_progress","color":"blue"}}},
                {"task":{"id":"p4t2", "status":{"status":"open","color":"gray"}}},
              ]        
      }
    },

]




  
  function navtemplate() {
 
    let projectNav = document.querySelector(".projects");
    let li;
    let hash={}
    for (let i = 0; i < projects.length; i++) {
      let project = projects[i].project;
      let innerLI="";
      for (let j = 0; j < project.tasks.length; j++) {
        let tasks =project.tasks;
         innerLI+=`<li><a class="bg-light text-dark"  href="/taskview.html?taskid=${tasks[j].task.id}">${tasks[j].task.id}</a></li>`
        hash[project.name]=innerLI;
      }
    }


    li = Object.keys(hash)
      .map(project => {
        return `<a onclick="displayProjectView(${project})" id="${project}" href="#" class="btn btn-light my-3" type="button" data-toggle="collapse" data-target="#collapse${project}" aria-expanded="false" aria-controls="collapseExample">${project}</a>
          <ul class="collapse" id="collapse${project}">${hash[project]}</ul>
        `;
      })
      .join("");
    let htmlOuput = `
      <ul class="nav flex-column ">
              ${li}            
      </ul> 
      `;
  
      projectNav.innerHTML = htmlOuput;

  }
  
 function changeViewStructure(){
   console.log("hello")
    // Change the structure either list view or board view for tasks
 document.getElementById('structureBtns').addEventListener("click",(e)=>{
   
  let structure  = document.getElementById('structure');

  if(e.target.id=='boardview' && structure.classList.contains('flex-column')){
    data="flex-row"
    structure.classList.replace('flex-column',data)
    console.log(e.target.id)
  }else if(e.target.id=='listview' &&  structure.classList.contains('flex-row')){
    data="flex-column"
    structure.classList.replace('flex-row',data)
    console.log(e.target.id)
  }else{
    structure.classList.add('flex-row')
  }
 
})
 }

  // Method to dipslay the right structure  following color codes with set status name s
  function viewStructure(){
    let statusLI=  statuses.map(status=>{
      return`
        <li class="col" >
          <div class="card text-center m-3" style="background-color: #ddddddf1; border-top:4px solid ${status.color}">
            <div >${status.name}</div>
          </div>
          <ul class="${status.name}">
           </ul>
        </li>
      `
    }).join("")
  
  let boardview=`
  <ul id="structure"  class="d-flex justify-content-between overflow-auto" style="list-style-type: none;">
    ${statusLI}
  <ul>
  `
  let view = document.getElementById('view')
      view.innerHTML=boardview
  
  }



  function displayProjectView(pid){
    viewStructure()
    
    let ul;
    // FInd the project
    let project;
    for (let i = 0; i < projects.length; i++) {
      if(projects[i].project.name==pid.id){
        project=projects[i].project;
        document.getElementById('projectname').innerHTML=project.name
      }
    }
    
    for (let k = 0; k < project.tasks.length; k++) {
     let task = project.tasks[k].task;
      ul = document.getElementsByClassName(task.status.status)[0]
     ul.innerHTML+=`
     <li><button class="bg-light text-dark task" id="${task.id}" >${task.id}</button></li>
     `;
      
    }


  }



  function displayTask(taskid){
    console.log("je")
  }
  
  document.addEventListener("DOMContentLoaded", () => {
       // Add boostrap to head
       document.head.innerHTML +=
       ` <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">   
       `;
       
    var urlParams = new URLSearchParams(window.location.search);
    if(urlParams.has('taskid')){
     let taskid= urlParams.get('taskid')
     displayTask(taskid)
    }else{
      navtemplate();
      // Had to call method twice due to js event propagatio to eliminate cicking twice to activate
      changeViewStructure();
      changeViewStructure();
    }
  });
  




  var task={
    "task": {
        "id": "9hv",
        "name": "Task Name",
        "status": {
            "status": "in_progress",
            "color": "#d3d3d3",
            "orderindex": 1,
            "type": "custom"
        },
        "orderindex": "1.00000000000000000000000000000000",
        "date_created": "1567780450202",
        "date_updated": "1567780450202",
        "date_closed": null,
        "creator": {
            "id": 183,
            "username": "John Doe",
            "color": "#827718",
            "profilePicture": "https://attachments-public.clickup.com/profilePictures/183_abc.jpg"
        },
        "assignees": [],
        "checklists": [],
        "tags": [],
        "parent": null,
        "priority": null,
        "due_date": null,
        "start_date": null,
        "time_estimate": null,
        "time_spent": null,
        "list": {
            "id": "123"
        },
        "folder": {
            "id": "456"
        },
        "space": {
            "id": "789"
        },
        "linked_tasks": [],
        "url": "https://app.clickup.com/t/9hx"
    }
}