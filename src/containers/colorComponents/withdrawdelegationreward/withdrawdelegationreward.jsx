import React from 'react';
import { popToTop } from 'react-chrome-extension-router';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { getStoredWallet, signWithPrivateKey } from '@rnssolution/color-keys';
import color from '../../../assets/img/color.svg';

import { goTo } from 'react-chrome-extension-router';
import TransactionSuccess from '../transactionsuccess/transactionSuccess';

let latestSignReq = localStorage.getItem('latestSignReq');
latestSignReq = JSON.parse(latestSignReq);

console.log('withdrawdelegationreward', latestSignReq);
export default function Withdrawdelegationreward() {
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  function withdrawreward(address, password, signMessage) {
    let wallet;
    let signature;
    let addr = latestSignReq.msgs[0].value.delegator_address;
    console.log(addr, 'aaadddrree');
    try {
      wallet = getStoredWallet(addr, password);
      signature = signWithPrivateKey(
        JSON.stringify(signMessage),
        Buffer.from(wallet.privateKey, 'hex')
      );
      chrome.runtime.sendMessage(
        {
          method: 'LUNIE_SIGN_REQUEST_RESPONSE',
          data: {
            signature: signature.toString('hex'),
            publicKey: wallet.publicKey,
          },
        },
        function(response) {
          console.log(response);
          localStorage.removeItem('latestSignReq');
          localStorage.removeItem('senderAddress');
          goTo(TransactionSuccess);
        }
      );
    } catch (err) {
      console.log(err);
      setPassword('');
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  }

  function reject(e) {
    let addr = localStorage.getItem('senderAddress');
    chrome.runtime.sendMessage(
      {
        method: 'rejectsignaccount',
        data: {
          rejected: true,
        },
      },
      function(response) {}
    );
    localStorage.removeItem('latestSignReq');
    localStorage.removeItem('senderAddress');
    window.close();
  }

  function passWordChange(e) {
    setPassword(e.target.value);
    setError(false);
  }

  function set() {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (latestSignReq === null || latestSignReq === undefined) {
    return popToTop();
  }
  return (
    <div>
      <div className="session-approve">
        <h2>Approve Transaction</h2>
        <br />
        <div className="from">
          From
          <div className="bech32-address">
            <div className="address">
              <CopyToClipboard
                text={latestSignReq.msgs[0].value.delegator_address}
                onCopy={() => set()}
              >
                <span>
                  {latestSignReq.msgs[0].value.delegator_address.substr(0, 6) +
                    '...' +
                    latestSignReq.msgs[0].value.delegator_address.substr(
                      latestSignReq.msgs[0].value.delegator_address.length - 4,
                      latestSignReq.msgs[0].value.delegator_address.length - 1
                    )}
                  {copied && (
                    <span style={{ color: 'green', fontSize: '10px' }}>
                      &nbsp;&#10004;&nbsp;Copied
                    </span>
                  )}
                </span>
              </CopyToClipboard>
            </div>
            <div className="copied">
              <i className="material-icons">check</i>
            </div>
          </div>
        </div>
        <div className="tm-form-group">
          <div className="tm-form-group__field">
            <div className="tx">
              <div className="tx__icon">
                <img
                  src={color}
                  alt="Colors atom token"
                  className="distribution"
                />
              </div>
              <div className="tx__content">
                <div
                  session-address="colors18mdxmk4cqdna47hu68g5snsz8zgrw357pn4xlm"
                  className="tx__content__left"
                >
                  <div
                    className="tx__content__caption"
                    style={{ color: 'black' }}
                  >
                    <p>Withdrawal</p>
                  </div>
                  <div className="tx__content__information">
                    From&nbsp;
                    <a className="">
                      <CopyToClipboard
                        text={latestSignReq.msgs[0].value.validator_address}
                        onCopy={() => set()}
                      >
                        <span>
                          {latestSignReq.msgs[0].value.validator_address.substr(
                            0,
                            6
                          ) +
                            '...' +
                            latestSignReq.msgs[0].value.validator_address.substr(
                              latestSignReq.msgs[0].value.validator_address
                                .length - 4,
                              latestSignReq.msgs[0].value.validator_address
                                .length - 1
                            )}
                          {copied && (
                            <span style={{ color: 'green', fontSize: '10px' }}>
                              &nbsp;&#10004;&nbsp;Copied
                            </span>
                          )}
                        </span>
                      </CopyToClipboard>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="action-modal-group tm-form-group">
              <label for="password" className="tm-form-group__label">
                Password
              </label>
              <div className="tm-form-group__field">
                <input
                  type="password"
                  placeholder="Password"
                  className="tm-field"
                  id="password"
                />
              </div>
              {error && (
                <span style={{ color: 'red', fontSize: '14px' }}>
                  Incorrect Password
                </span>
              )}
            </div>
            <div className="session-approve-footer">
              <button
                className="button left-button secondary"
                id="reject-btn"
                onClick={() => reject()}
              >
                Reject
              </button>
              <button
                className="button right-button"
                id="approve-btn"
                onClick={(e) =>
                  withdrawreward(
                    latestSignReq.msgs[0].value.delegator_address,
                    password,
                    {
                      account_number: latestSignReq.account_number,
                      chain_id: latestSignReq.chain_id,
                      fee: latestSignReq.fee,
                      memo: latestSignReq.memo,
                      msgs: latestSignReq.msgs,
                      sequence: latestSignReq.sequence,
                    }
                  )
                }
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
