import '../../assets/img/icon-34.png';
import '../../assets/img/icon-128.png';

import { storeWallet } from '@rnssolution/color-keys';

// console.log('This is the background page.');
// console.log('Put the background scripts here.');

// chrome.runtime.onConnect.addListener(function(port) {
//   console.log('portt in background', port);
//   console.assert(port.name == 'knockknock');
//   port.onMessage.addListener(function(msg) {
//     console.log(msg, 'message in port');
//     if (msg.joke == 'Knock knock')
//       port.postMessage({ question: "Who's there?" });
//     else if (msg.answer == 'Madame')
//       port.postMessage({ question: 'Madame who?' });
//     else if (msg.answer == 'Madame... Bovary')
//       port.postMessage({ question: "I don't get it." });
//   });
// });

window.addEventListener('message', function(event) {
  console.log('message listened');
  console.log(event);
  // We only accept messages from ourselves
  if (event.source != window) return;

  if (event.type && event.type == 'FROM_PAGE') {
    console.log('if working');
    console.log('Content script received message: ' + event.data.text);
  }
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  console.log(message, 'message');
  console.log(sender, 'sender');
  console.log(sendResponse, 'sendresponse');
  console.log('message received');
  if (message === 'givemedata') {
    console.log('in give me data', localStorage);
    sendResponse({ status: localStorage });
  }
});

// chrome.windows.create(
//   {
//     type: 'popup',
//     url: 'http://localhost:3000/',
//     type: 'popup',
//   },
//   function(newWindow) {}
// );

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // console.log(sender, 'senderrrr123');
  // console.log(request, 'reererer');
  if (request.method == 'getStatus') {
    // console.log(chrome.tabs);
    if (sender.url === 'http://localhost:3000/') {
      sendResponse({ status: localStorage });
    } else if (request.method == 'webmessage') {
      sendResponse({ status: 'message recieved' });
    } else {
      sendResponse({ status: 'No Data for you Bro' });
    }
  }
  // else if (request.method == 'set_wallets') {
  //   localStorage.setItem('wallets', request.data);
  //   sendResponse({ status: localStorage['wallets'] });
  // } else if (request.method === 'givemedata') {
  //   sendResponse({ status: localStorage });
  // }
  else if (request.method == 'setextensionaddress') {
    try {
      storeWallet(
        request.data.wallet,
        request.data.accountname,
        request.data.password
      );
      sendResponse({ status: 'success', request });
    } catch (err) {
      sendResponse({ status: err.message, request });
    }
  } else if (request.method == 'getextensionaddress') {
    var values = allStorage();
    sendResponse({ status: values[0] });
  } else sendResponse({}); // snub them.
});

function allStorage() {
  var values = [],
    keys = Object.keys(localStorage).map((type, key) => {
      if (type.includes('cosmos-wallets-colors')) {
        return type;
      } else {
        return undefined;
      }
    }),
    i = keys.length;

  while (i--) {
    if (keys[i] !== undefined) {
      values.push(JSON.parse(localStorage.getItem(keys[i])));
    }
  }

  return values;
}
