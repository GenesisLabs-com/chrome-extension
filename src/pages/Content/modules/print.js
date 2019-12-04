export const printLine = (line, arg2) => {
  console.log('===> FROM THE PRINT MODULE:', line, arg2);
};

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
  // console.log("Message:::::", e.data)
  if (e.source === window && e.data.type && "FROM_LUNIE_IO" === e.data.type && (e.data)) {
    console.log("skipResponse", e.skipResponse)
    INIT_EXTENSION()
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

      console.log("console", app)
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
});