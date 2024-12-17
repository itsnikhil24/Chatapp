const socket=io();
const messages = document.getElementById('chat-messages');

socket.on("total_clinet",(data)=>{
    console.log(data);
})

let formsubmit=document.getElementById("chat-form");
let input=document.getElementById("message-input");

formsubmit.addEventListener("submit",(e)=>{
    e.preventDefault();
    if (input.value) {
        socket.emit("chat_message",input.value);
        const div = document.createElement('div');
        const paragraph = document.createElement('p');
       div.className = 'message sent';
        paragraph.textContent  = input.value;
        div.appendChild(paragraph);
        messages.appendChild(div);
        input.value="";
    }
})

socket.on('chat_message', (message) => {
    const div = document.createElement('div');
    const paragraph = document.createElement('p');
   div.className = 'message received';
    paragraph.textContent  = message;
    div.appendChild(paragraph);
    messages.appendChild(div);
    // window.scrollTo(0, document.body.scrollHeight);
  });
