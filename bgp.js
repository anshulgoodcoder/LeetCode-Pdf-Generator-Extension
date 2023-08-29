let leetcodeCookies = "No Cookies Found";
(async()=>{
    const cookies = await chrome.cookies.getAll({domain:"leetcode.com"});
    leetcodeCookies = cookies;
})();
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.greeting === "Send Cookies"){
      let cookies = leetcodeCookies;
      console.log(cookies)
      sendResponse({farewell: "goodbye",cookie:cookies});
    }
    }
 );





 
