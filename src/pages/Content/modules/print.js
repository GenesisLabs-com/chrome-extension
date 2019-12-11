var temp = 0;
export const printLine = (line, arg2) => {
  console.log('===> FROM THE PRINT MODULE:', line, arg2);
};
chrome.runtime.onMessage.addListener(
  function (request, sender) {

    var dataextension = [];
    if (request.signature && request.publicKey)
      dataextension.push({ "signature": request.signature, "publicKey": request.publicKey })

    var data = {
      message: {
        payload: dataextension,
        type: "LUNIE_SIGN_REQUEST_RESPONSE"
      },
      type: "FROM_LUNIE_EXTENSION"
    };
    dataextension = []
    window.postMessage(data, "*")
    console.log("tab[0].idtab[0].idtab[0].idtab[0].idtab[0].idtab[0].id")
  });

// export const getDatafromExtension = (data) => {
//   // console.log('data from extension', data);
// };

function getData() {
  chrome.runtime.sendMessage({ method: 'getextensionaddress' }, function (response) {
    return JSON.stringify(response.values[0]);
  });
}

// function listenerFunc() {
//   chrome.runtime.onMessage.addListener(
//     function (request, sender, sendResponse) {
//     //  console.log("ExtensionListener")
//       // console.log(sender.tab ?
//       //   "from a content script:" + sender.tab.url :
//       //   "from the extension");
//       if (request.greeting == "hello")
//         sendResponse({ farewell: "goodbye" });
//     });
// }
//chrome.runtime.onMessage.addListener(function (data, n, t) {

//var r = formatting(data.type, data.payload); window.postMessage(r, "*")
//})
function INIT_EXTENSION() {
  //var e = o("INIT_EXTENSION", { extension_enabled: !0 });
  var e = { type: "FROM_LUNIE_EXTENSION", message: { type: 'INIT_EXTENSION', payload: 'extension_enabled:!0' } }
  window.postMessage(e, "*")
}

window.addEventListener("message", function (e) {

  //console.log("temp", temp % 5, temp)
  if (temp == 0) {
    temp = temp + 1
    INIT_EXTENSION()
  }

  if (e.source === window && e.data.type && "FROM_LUNIE_IO" === e.data.type && (e.data) && e.data.payload && e.data.payload.type == "GET_WALLETS") {
    //listenerFunc()
    var dataextension;
    chrome.runtime.sendMessage({ method: 'getextensionaddress' }, function (response) {
      // dataextension = JSON.stringify(response.values)//JSON.parse(JSON.stringify(response.values[0]));
      var dataextension = [];


      if (response.values) {
        response.values.map((type) => {
          if (type.address && type.name)
            dataextension.push({ "address": type.address, "name": type.name })
        })

        // if (obj && obj.name && obj.address) {
        //   dataextension.push({ "address": obj.name, "name": obj.address });
        // }
      }

      var data = {
        type: "FROM_LUNIE_EXTENSION",
        message: {
          type: "GET_WALLETS_RESPONSE",
          payload: dataextension

        }
      };
      dataextension = []
      window.postMessage(data, "*")
    });

  }
  else if (e.source === window && e.data.type && "FROM_LUNIE_IO" === e.data.type && (e.data) && e.data.payload && e.data.payload.type == "LUNIE_SIGN_REQUEST") {
    console.log("LUNIE_SIGN_REQUEST")
    chrome.runtime.sendMessage({ method: 'LUNIE_SIGN_REQUEST', data: e.data }, function (response) {
      var data = [
        {
          payload: {
            payload: {
              senderAddress: "cosmos1234",
              signMessage: "abc"
            },
            type: "LUNIE_SIGN_REQUEST"
          },
          skipResponse: true,
          type: "FROM_LUNIE_IO"
        },
        "*"
      ]
      //    window.postMessage(data, "*")
    });
  }
});


