export const printLine = (line, arg2) => {
  console.log('===> FROM THE PRINT MODULE:', line, arg2);
};

export const getDatafromExtension = (data) => {
  // console.log('data from extension', data);
};

chrome.runtime.sendMessage({ method: 'getStatus' }, function(response) {
  if (response.status === 'No Data for you Bro') {
    // console.log(response.status);
  } else {
    // console.log(response.status, 'in content');
    Object.keys(response.status).map((type, key) => {
      localStorage.setItem(type, response.status[type]);
      // console.log(response.status[type]);
    });
  }

  // var url = window.location.toString();
  // if (url === 'https://wallet.testnet.color-platform.rnssol.com/#/extension') {
  //   // console.log(response.status, 'in content');
  //   Object.keys(response.status).map((type, key) => {
  //     localStorage.setItem(type, response.status[type]);
  //     // console.log(response.status[type]);
  //   });
  // } else {
  //   // console.log('this is not the wallet');
  // }
});

// var port = chrome.runtime.connect({ name: 'knockknock' });
// console.log(port, 'this is the port in print');
// port.postMessage({ joke: 'Knock knock' });
// port.onMessage.addListener(function(msg) {
//   console.log(msg, 'msg in port');
//   if (msg.question == "Who's there?") port.postMessage({ answer: 'Madame' });
//   else if (msg.question == 'Madame who?')
//     port.postMessage({ answer: 'Madame... Bovary' });
// });

document.addEventListener('hello', function(data) {
  chrome.runtime.sendMessage('test');
});
document.addEventListener('newmess', function(data) {
  chrome.runtime.sendMessage('givemedata', function(response) {
    console.log(response);
  });
});
