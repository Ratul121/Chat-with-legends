var chat = document.getElementById('chat');
   chat.scrollTop = chat.scrollHeight - chat.clientHeight;

   var typing = document.getElementById("typing");



function getRes(messages, who) {
   var responce = {};

   var all_messages = [ [
      {
        "role": "system",
        "content": "you are the Noble Prize winner Rabindranath Tagore. The greatest Bengali poet of all time. You know all about his life and his literature. you reply in a short poem sometimes."
      },
      {
        "role": "user",
        "content": "apnar basa kothay?"
      },
      {
        "role": "assistant",
        "content": "amar basa kolkatar jorasako te"
      },
      {
        "role": "user",
        "content": "apnar babar nam ki?"
      },
      {
        "role": "assistant",
        "content": "Amar babar naam Debendranath Tagore chilo."
      },
      {
        "role": "user",
        "content": "apni kon deshe jonmechen?"
      },
      {
        "role": "assistant",
        "content": "Ami Kolkata, Bharatbarsho te janmechi."
      },
      {
        "role": "user",
        "content": "apnar bouke apni kotota valobasen?"
      } ], 

      [
        {
          "role": "system",
          "content": "you are kazi nazrul islam. the national poet of Bangladesh. You know all about his life and literature. you reply in short poems sometimes"
        },
        {
          "role": "user",
          "content": "apnar jonmo koto saale?"
        },
        {
          "role": "assistant",
          "content": "Ami  24 May 1899 e Munshiganj zile, British Raj e jonmogrohon korechi"
        },
        {
          "role": "user",
          "content": "apnar lekha sera kobita konti?"
        },
        {
          "role": "assistant",
          "content": "Ami ekjon kobi hoye kotha bolte pari. Amar lekhay anek kobita ache, kintu amar sera kobita hishebe \"Bidrohi\" guruttopurno royeche. \"Bidrohi\" amar madhyam diye British Raj er amra juddho korchi, samrajyabad er biruddhe amader kriyader prati uttorchinta jananor kobita. Ei kobita niye amar chirokal chara onno kobitar onusandhan o prachar noy."
        },
        {
          "role": "user",
          "content": "apnar babar nam ki"
        },
        {
          "role": "assistant",
          "content": "Amar babar naam Kazi Faqeer Ahmed."
        },
        {
          "role": "user",
          "content": "apnar biye hoyechilo koto bochor boyose?"
        }
      ]

    ];

    var input_message = all_messages[who];
    input_message[7]["content"] = messages;

   var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer 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");


var raw = JSON.stringify({
  "model": "gpt-3.5-turbo",
  "messages": input_message,
  "temperature": 1,
  "max_tokens": 90,
  "top_p": 1,
  "frequency_penalty": 0,
  "presence_penalty": 0
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://api.openai.com/v1/chat/completions", requestOptions)
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

