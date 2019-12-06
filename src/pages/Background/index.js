import '../../assets/img/icon-34.png';
import '../../assets/img/icon-128.png';

import { storeWallet } from '@rnssolution/color-keys';
import { Queue } from './queue';
const q = new Queue();
var latestSignReq = 'latestsignreq';
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
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
  } else if (request.method == 'getextensionaddress') {
    var values = allStorage();
    sendResponse({ values });
  } else if (request.method == 'LUNIE_SIGN_REQUEST') {
    let temp = request.data.payload.payload.signMessage;
    temp = JSON.parse(temp);
    console.log('LUNIE_SIGN_REQUEST_Saad', temp);
    q.add(temp);
    latestSignReq = q.first();
    localStorage.setItem('latestSignReq', JSON.stringify(latestSignReq));
    // export var senderAddress = request.data.payload.payload.senderAddress;
    sendResponse({ status: 'success', type: 'LUNIE_SIGN_REQUEST_Saad' });
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
