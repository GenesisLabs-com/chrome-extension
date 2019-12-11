import '../../assets/img/icon-34.png';
import '../../assets/img/icon-128.png';

import { storeWallet } from '@rnssolution/color-keys';
import { Queue } from './queue';
const q = new Queue();
var latestSignReq = 'latestsignreq';
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('REspose::', request);
  if (request.method == 'getStatus') {
    if (sender.url === 'http://localhost:3000/') {
      sendResponse({ status: localStorage });
    } else if (request.method == 'webmessage') {
      sendResponse({ status: 'message recieved' });
    } else {
      sendResponse({ status: 'No Data for you Bro' });
    }
  } else if (request.method == 'setextensionaddress') {
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
  } else if (request.method == 'LUNIE_SIGN_REQUEST_RESPONSE') {
    try {
      console.log('LUNIE_SIGN_REQUEST_RESPONSE', request);

      chrome.tabs.query({
        currentWindow: true,
        active: true
        // Select active tab of the current window
      }, function (tab) {
        // console.log("TAB ID", tab[0].id)
        chrome.tabs.sendMessage(
          // Send a message to the content script
          tab[0].id, { signature: request.data.signature, publicKey: request.data.publicKey }
        );
      });


      sendResponse({ status: 'success', request });
    } catch (err) {
      sendResponse({ status: err.message, request });
    }
  } else if (request.method == 'getextensionaddress') {
    var values = allStorage();
    sendResponse({ values });
  }
  // else if (request.method == 'LUNIE_SIGN_REQUEST_RESPONSE') {
  //   console.log("LUNIE_SIGN_REQUEST_RESPONSELUNIE_SIGN_REQUEST_RESPONSELUNIE_SIGN_REQUEST_RESPONSELUNIE_SIGN_REQUEST_RESPONSE")
  // }
  else if (request.method == 'LUNIE_SIGN_REQUEST') {
    let temp = request.data.payload.payload.signMessage;
    temp = JSON.parse(temp);
    q.add(temp);
    latestSignReq = q.first();
    console.log(request.data);
    localStorage.setItem('latestSignReq', JSON.stringify(latestSignReq));
    localStorage.setItem(
      'senderAddress',
      JSON.stringify(request.data.payload.payload.senderAddress)
    );
    // export var senderAddress = request.data.payload.payload.senderAddress;
    sendResponse({ status: 'success', type: 'LUNIE_SIGN_REQUEST_Saad' });
  } else if (request.method == 'LUNIE_SIGN_REQUEST_RESPONSE') {
    console.log('Response,', request);
    sendResponse({
      data: {
        message: {
          payload: {
            signature: 'abcd',
            publicKey: '1234',
          },
          type: 'LUNIE_SIGN_REQUEST_RESPONSE',
        },
        type: 'FROM_LUNIE_EXTENSION',
      },
    });
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
