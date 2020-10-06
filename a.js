function speak() {
    
}


function WebSocketTest() {
            
    if ("WebSocket" in window) {
       
       
       // Let us open a web socket
       var ws = new WebSocket("ws://localhost:5060/SCardRead");
        
       ws.onopen = function() {
          
          // Web Socket is connected, send data using send()
          ws.send("RunCardDetection");
        //   ws.send("ReadCard");
        //   ws.send("RunCardDetection");
        //   ws.send("RunCardDetection");
          
       };
        
       ws.onmessage = function (evt) { 
          var received_msg = evt.data;
          try {
            var obj = JSON.parse(received_msg);
            console.log(obj);    
            if(obj.EventName == "CardInserted"){
                  ws.send("ReadCard");

            }else if(obj.MessageType == "Data"){
                var cData = obj.CardData;
                var msg = new SpeechSynthesisUtterance();
                msg.text = "Good morning "+cData.EnglishFullName;
                window.speechSynthesis.speak(msg);
            }

          } catch (error) {
            console.log(received_msg);    
          }
          
          
          
       };
        
       ws.onclose = function() { 
          
          // websocket is closed.
          
       };
    } else {
      
       // The browser doesn't support WebSocket
       
    }
 }