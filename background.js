var url;
var result;
url = "wait";
domain = "wait";

chrome.runtime.onMessage.addListener(function(msg,sender) {
  if (msg.from == "content") {
    // console.log(msg.url);
    if (msg.url=="undefined") {
      chrome.runtime.sendMessage({  //send it to popup script
      from: "background",
      result: "not_amz_product"
    });
    return;
    } else if(msg.url==url){
      chrome.runtime.sendMessage({  //send it to popup script
      from: "background",
      result: key,
      domain: domain
      });
    return;
    }
    url = msg.url;
    domain = msg.domain;
    imageSearch();  //got message from popup
    function imageSearch() {

// console.log(url);
data = {
  "url":url,
  "domain":domain
}
fetch('https://timmak.pythonanywhere.com/imgSearch', {
method: 'post',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify(data)
})
.then(res=>res.json())
.then(function(res){
  // console.log(res);
  key=res;
      chrome.runtime.sendMessage({  //send it to popup script
      from: "background",
      result: key,
      domain: domain
    });
});
  }}
});
