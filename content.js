var url;
chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        if( request.message === "start" ) {
          if(document.querySelector("[data-old-hires]")==null){
            url = "undefined";
            domain = location.hostname;
          }else {
            url = document.querySelector("[data-old-hires]").getAttribute("src");
            domain = location.hostname;
          }
    chrome.runtime.sendMessage({
      from:"content",
      url: url,
      domain: domain
    });
  }
});
