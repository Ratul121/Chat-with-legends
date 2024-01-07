var chat = document.getElementById('chat');
   chat.scrollTop = chat.scrollHeight - chat.clientHeight;

   var typing = document.getElementById("typing");



function getRes(messages, who) {
   var responce = {};

 

fetch("https://potromitali.xyz/CWL/" + who + ".php?p=" + messages)
  .then(response => response.json())
  .then(result => { 
   var res_text = result['choices'][0]['message']['content'].replaceAll("\n", "<br>");
   var messages_element = document.getElementById("messages");
   var messages = messages_element.innerHTML;
   messages += "<div class ='message AI'>"+ res_text + "</div>"; 
   messages_element.innerHTML = messages;
   typing.style.display = 'none';
   console.log(res_text)  })
  .catch(error => console.log('error', error));

  
}



function send(which) {
   var inp = document.getElementById("text");
   var text = inp.value;
   var messages_element = document.getElementById("messages");
   var messages = messages_element.innerHTML;

   if(text != "") {
      messages += "<div class ='message user'>"+ text + "</div>"; 
      messages_element.innerHTML = messages;
      inp.value = "";
      typing.style.display = 'block';
      scrollToBottom('chat');
      getRes(text, which);
   }
}

const scrollToBottom = (id) => {
   const element = document.getElementById(id);
   element.scrollTop = element.scrollHeight;
}

