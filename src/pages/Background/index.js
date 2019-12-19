import '../../assets/img/icon-34.png';
import coloricon from '../../assets/img/icon-128.png';
import notification from '../../assets/img/Color_notification_icon.svg';
import { storeWallet } from '@rnssolution/color-keys';
import { Queue } from './queue';

//make new queue to get latest sign requests
const q = new Queue();
//latestsignrequest is set to first element of Queue
var latestSignReq = 'latestsignreq';

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  //starting messages for extension communication
  console.log(request, '==background==');
  if (request.method == 'getStatus') {
    if (sender.url === 'http://localhost:3000/') {
      sendResponse({ status: localStorage });
    } else if (request.method == 'webmessage') {
      sendResponse({ status: 'message recieved' });
    } else {
      sendResponse({ status: 'No Data for you Bro' });
    }
  }

  //set extension addresses to localstorage
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
  }

  //send approve response to wallet
  else if (request.method == 'LUNIE_SIGN_REQUEST_RESPONSE') {
    try {
      // console.log('LUNIE_SIGN_REQUEST_RESPONSE', request);

      chrome.tabs.query(
        {
          currentWindow: true,
          active: true,
          // Select active tab of the current window
        },
        function (tab) {
          chrome.browserAction.setIcon({
            path: coloricon,
            tabId: tab[0].id,
          });
          // console.log("TAB ID", tab[0].id)
          chrome.tabs.sendMessage(
            // Send a message to the content script
            tab[0].id,
            {
              signature: request.data.signature,
              publicKey: request.data.publicKey,
            }
          );
        }
      );

      sendResponse({ status: 'success', request });
    } catch (err) {
      sendResponse({ status: err.message, request });
    }
  }

  //get all extension addresses stored in localstorage
  else if (request.method == 'getextensionaddress') {
    var values = allStorage();
    sendResponse({ values });
  }

  //set signrequest and senderaddress to local storage
  else if (request.method == 'LUNIE_SIGN_REQUEST') {
    let temp = request.data.payload.payload.signMessage; //getting signMessage from request
    temp = JSON.parse(temp); //parsing data because typeof of temp is string
    q.add(temp); // adding sign request to queue
    latestSignReq = q.first(); // getting latest sign request
    //writing data to localstorage
    localStorage.setItem('latestSignReq', JSON.stringify(latestSignReq));
    localStorage.setItem(
      'senderAddress',
      JSON.stringify(request.data.payload.payload.senderAddress)
    );
    //change extension icon
    chrome.browserAction.setIcon({
      path: notification,
      tabId: sender.tab.id,
    });
    //sending successful response to Print.JS File
    sendResponse({
      status: 'success',
      type: {
        senderAddress: request.data.payload.payload.senderAddress,
        signMessage: temp,
      },
    });
  }

  //reject account and send response to wallet to reject a transaction
  else if (request.method == 'rejectsignaccount') {
    chrome.tabs.query(
      {
        currentWindow: true,
        active: true,
        // Select active tab of the current window
      },
      function (tab) {
        // console.log("TAB ID", tab[0].id)
        chrome.browserAction.setIcon({
          path: coloricon,
          tabId: tab[0].id,
        });
        chrome.tabs.sendMessage(
          // Send a message to the content script
          tab[0].id,
          {
            method: 'rejectsignaccount',
            rejected: true,
          }
        );
      }
    );
  } else sendResponse({}); // snub them.
});

//this function returns all addresses stored in localstorage of extension
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
