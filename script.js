let deferredPrompt;
const isIos = /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
// add to homescreen
window.addEventListener("beforeinstallprompt", (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
});

// Set data
function setData(key, value) {
  localStorage.setItem(key, value);
}

// Get data from localStorage
function getData(key) {
  return localStorage.getItem(key)==='true' || false;
}

function isIOS() {
  return isIos;
}

//function isDeferredNotNull() {
////+++++
/////ios 不支援 deferredPrompt
//const isIos = /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
//const isStandalone = navigator.standalone === false;
//if(isIos) return isStandalone;
////+++++
//
//  return deferredPrompt != null;
//}

function isDeferredNotNull() {
//+++++
///ios 不支援 deferredPrompt
if(isIos) return navigator.standalone === false;
//+++++

  return deferredPrompt != null;
}

function isDeferredPrompt(){
return deferredPrompt;
}

function presentAddToHome() {
  if (deferredPrompt != null) {
    // Update UI to notify the user they can add to home screen
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        //setData('showWap','true'); //安裝過不再顯示，但如果被移除後也一樣不顯示
        console.log("User accepted the A2HS prompt");
      } else {
        console.log("User dismissed the A2HS prompt");
      }
      deferredPrompt = null;
    });
  } else {
    console.log("deferredPrompt is null");
    return null;
  }
}

async function toShare() {
  const respond = await fetch("https://i0.wp.com/janstockcoin.com/wp-content/uploads/2021/06/pexels-photo-747964-scaled.jpeg?fit=2560%2C1616&ssl=1".toString());
  const blob = await respond.blob();
  const filesArray = [
    new File([blob], 'name',{
      type: 'image/jpeg'
    }),
  ];
  const shareData ={files: filesArray}

  if(navigator.canShare && navigator.canShare(shareData)){
    await navigator.share(shareData);
    return true;
  }else{
    alert("can't share");
    return false;
  }
}