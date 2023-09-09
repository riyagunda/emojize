const main_chat_room = document.createElement("div");
const lobby_angry = document.createElement("div");
const lobby_happy = document.createElement("div");
const lobby_sad = document.createElement("div");
const lobby_scared = document.createElement("div");

//update content for menu
const contentStates = [
    "content1",
    "content2",
    lobbies = [main_chat_room, lobby_angry, lobby_happy, lobby_sad, lobby_scared],
    lobbyNames = ["main_chat_room", "lobby_angry", "lobby_happy", "lobby_sad", "lobby_scared"]
];


const contentDiv = document.querySelector('.content');

function updateContent(index) {
    contentDiv.innerHTML = '';
    if (index === 2) {
        for(let i=0; i<lobbies.length; i++) {
            contentDiv.append(lobbies[i]);
            lobbies[i].innerHTML = "<img><button onclick = window.location.href=" + lobbyNames[i] + ".html>Join Lobby</button><p>326/500<img></p>";
        }
    }
    else contentDiv.innerHTML = contentStates[index];
}

