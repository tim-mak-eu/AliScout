{
 "name": "AliScout",
 "manifest_version": 2,
 "version": "0.9",
 "description": "Find the Amazon product on AliExpress",
 "default_locale": "en",
 "icons": { "16": "images/icon.png",
            "48": "images/icon.png",
            "128": "images/icon.png" },
 "permissions": ["https://timmak.pythonanywhere.com/"],
 "browser_action":{
    "default_popup": "popup.html"
 },
 "background": {
     "persistent": true,
     "scripts": ["background.js"]
 },
 "content_scripts": [
     {
         "matches": ["<all_urls>"],
         "js": ["content.js"],
         "run_at": "document_start"
     }
 ]
}
