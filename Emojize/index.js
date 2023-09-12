let input = localStorage.getItem('input');
let display = false;
      function returnText(){
        input = document.getElementById("user-input").value;
        document.getElementById("user-input").innerHTML = '';
        localStorage.setItem('input', input);  
      }    
     // document.querySelector('.text-display').innerHTML += input;

      //----------------------------------------------------------
      const main_chat_room = document.createElement("div");
      const lobby_angry = document.createElement("div");
      const lobby_happy = document.createElement("div");
      const lobby_sad = document.createElement("div");
      const lobby_overwhelmed = document.createElement("div");

      //update content for menu
      const contentStates = [
          "content1",
          "content2",
          lobbies = ['index', "lobby_happy", 'lobby_sad', 'lobby_angry', 'lobby_overwhelmed'],
          lobbyNames = ["Main chat room", " 😊 Join Happy lobby", "😢 Join Sad lobby", "😟 Join Worried lobby", "😨 Join Scared lobby"]
      ];


      const contentDiv = document.querySelector('.content');

      function updateContent(index) {
          contentDiv.innerHTML = '';
          if (index === 1) {
            contentDiv.innerHTML = `<div onclick="console.log('riya');"><iframe src="https://giphy.com/embed/tIeCLkB8geYtW" width="300"  frameBorder="0"></iframe><br></div>

            <iframe src="https://giphy.com/embed/tXL4FHPSnVJ0A" width="300"  frameBorder="0" class="giphy-embed" allowFullScreen></iframe><br>
            <iframe src="https://giphy.com/embed/fzGR5h8oAAzQX3F6e9" width="300" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><br>
            <iframe src="https://giphy.com/embed/nMTKVjM4SY3ZaUfbWK" width="300" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><br>
            <iframe src="https://giphy.com/embed/UO5elnTqo4vSg" width="300" height="439" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><br>
            <iframe src="https://giphy.com/embed/kemcL4hhPTtQiB1nmg" width="300" height="400" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`;
          } else if (index === 2) {
            let cont = '';
              for(let i=0; i<lobbies.length; i++) {
                  contentDiv.append(lobbies[i]);
                  let temp = contentStates[2][i] + '.html';
                  console.log(temp);
                  cont += `<button class = "lobby-button"> <a href="`+temp+`">${lobbyNames[i]} (326/500)</a></button>`;
              }
              contentDiv.innerHTML = cont;
          } else if(index === 0) {
            contentDiv.innerHTML = `<button class = "text-prompts" onclick = "addPromptToList('Hey!');
            printTask();">Hey!</button><br>

            <button class = "text-prompts"  onclick = "addPromptToList('How is your day going?');
            printTask();">How is your day going?</button><br>

            <button class = "text-prompts"  onclick = "addPromptToList('Thank you!');
            printTask();">Thank you!</button><br>

            <button class = "text-prompts" onclick = "addPromptToList('You are welcome!');
            printTask();">You are welcome!</button><br>

            <button class = "text-prompts"  onclick = "addPromptToList('I am sorry!');
            printTask();">I am sorry!</button><br>

            <button class = "text-prompts" onclick = "addPromptToList('That is hilarious!');
            printTask();">That is hilarious!</button><br>

            <button class = "text-prompts"  onclick = "addPromptToList('Keep going, you got this!');
            printTask();">Keep going, you got this!</button><br>

            <button class = "text-prompts" onclick = "addPromptToList('Wow, I am impressed!');
            printTask();">Wow, I am impressed!</button>`;
          }
      }

      //-----------------------------------------
      let tasks = [];
     if(JSON.parse(localStorage.getItem('tasks')) === null){
      tasks = [];
     } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
     } 

     printTask();

     function addToList() {
      const todoTask = document.querySelector('.js-task-name').value;
      const todoDate = document.querySelector('.js-date').value;
      tasks.push({name: todoTask, date : todoDate});
      document.querySelector('.js-task-name').value = '';
      console.log(tasks);
      printTask();

      saveTasks();
     }

     function addPromptToList(phrase) {
      const todoTask = phrase;
      const todoDate = document.querySelector('.js-date').value;
      tasks.push({name: todoTask, date : todoDate});
      document.querySelector('.js-task-name').value = '';
      console.log(tasks);
      printTask();

      saveTasks();
     }

     function addGifToList(gif) {
      const todoTask = gif;
      const todoDate = document.querySelector('.js-date').value;
      tasks.push({name: todoTask, date : todoDate});
      document.querySelector('.js-task-name').value = '';
      console.log(tasks);
      printTask();

      saveTasks();
     }

     function printTask() {
      let todoList = '';
      let html = '';
      for(let i = 0; i < tasks.length; i++) {
        html = `
          <div class = "new-message1">${tasks[i].name}
          <button onclick = "
          tasks.splice(${i}, 1);
          printTask();
          console.log(tasks);
        " class = "delete-style">Delete</button></div>`;
        todoList += html;
      }
      document.querySelector('.new-message').innerHTML = todoList;
      saveTasks(todoList);
    }

    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } 

    //--------------------------------------------------------------
    
    function inhale() {
      document.querySelector('.js-break-time').innerHTML = `<div class = 'break-design'><p class = "breather"></p></div>`;

      let seconds = 5;
      while(seconds > -1) {
        document.querySelector('.breather').innerHTML = `Inhale for ${seconds}`;
        subtract(seconds);
      }
      document.querySelector('.breather').innerHTML = '';
    }
    
    function subtract(seconds) {
      seconds--;
      return seconds;
    }

    console.log(subtract(7));
    











    function myFunction() {
      var x = document.getElementById("chat-pop");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    }