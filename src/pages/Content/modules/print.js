var temp = 0;
export const printLine = (line, arg2) => {
  console.log('===> FROM THE PRINT MODULE:', line, arg2);
};
chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.method == 'rejectsignaccount') {
    var data = {
      message: {
        payload: {
          rejected: true,
        },
        type: 'LUNIE_SIGN_REQUEST_RESPONSE',
      },
      type: 'FROM_LUNIE_EXTENSION',
    };
  } else {
    var data = {
      message: {
        payload: {
          signature: request.signature,
          publicKey: request.publicKey,
        },
        type: 'LUNIE_SIGN_REQUEST_RESPONSE',
      },
      type: 'FROM_LUNIE_EXTENSION',
    };
  }
  // dataextension = [];
  window.postMessage(data, '*');
  console.log('Done Signing');
});


function getData() {
  chrome.runtime.sendMessage({ method: 'getextensionaddress' }, function (
    response
  ) {
    return JSON.stringify(response.values[0]);
  });
}

function INIT_EXTENSION() {
  //var e = o("INIT_EXTENSION", { extension_enabled: !0 });
  var e = {
    type: 'FROM_LUNIE_EXTENSION',
    message: { type: 'INIT_EXTENSION', payload: 'extension_enabled:!0' },
  };
  window.postMessage(e, '*');
}

window.addEventListener('message', function (e) {
  if (temp == 0) {
    temp = temp + 1;
    INIT_EXTENSION();
  }

  if (
    e.source === window &&
    e.data.type &&
    'FROM_LUNIE_IO' === e.data.type &&
    e.data &&
    e.data.payload &&
    e.data.payload.type == 'GET_WALLETS'
  ) {
    //listenerFunc()
    // var dataextension;
    chrome.runtime.sendMessage({ method: 'getextensionaddress' }, function (
      response
    ) {
      var dataextension = [];

      if (response.values) {
        response.values.map((type) => {
          if (type.address && type.name)
            dataextension.push({ address: type.address, name: type.name });
        });
      }

      var data = {
        type: 'FROM_LUNIE_EXTENSION',
        message: {
          type: 'GET_WALLETS_RESPONSE',
          payload: dataextension,
        },
      };
      dataextension = [];
      window.postMessage(data, '*');
    });
  } else if (
    e.source === window &&
    e.data.type &&
    'FROM_LUNIE_IO' === e.data.type &&
    e.data &&
    e.data.payload &&
    e.data.payload.type == 'LUNIE_SIGN_REQUEST'
  ) {
    chrome.runtime.sendMessage(
      { method: 'LUNIE_SIGN_REQUEST', data: e.data },
      function (response) {
        var data = [
          {
            payload: {
              payload: {
                senderAddress: response.type.senderAddress,
                signMessage: response.type.signMessage,
              },
              type: 'LUNIE_SIGN_REQUEST',
            },
            skipResponse: true,
            type: 'FROM_LUNIE_IO',
          },
          '*',
        ];
        window.postMessage(data, '*');
      }
    );
  }
});

INIT_EXTENSION();