import React from 'react';
import color from '../../../assets/img/color.svg';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { fullDecimals, viewDenom } from '../scripts/num';
import { getStoredWallet, signWithPrivateKey } from '@rnssolution/color-keys';
export default function SignExtension(props) {
  let subtotal = parseFloat(props.latestSignReq.msgs[0].value.amount[0].amount);
  let networkfee = parseFloat(props.latestSignReq.fee.gas);
  subtotal = subtotal / 1000000;
  networkfee = networkfee * 0.000000001;
  let total = subtotal + networkfee;
  function reject() {
    console.log('reject');
    localStorage.removeItem('latestSignReq');
    localStorage.removeItem('senderAddress');
    window.close();
  }

  const [error, setError] = React.useState(false);
  ///Sign A transaction using Extension
  function signWithExtension(address, password, signMessage) {
    let wallet;
    let signature;
    try {
      wallet = getStoredWallet(address, password);
      signature = signWithPrivateKey(
        signMessage,
        Buffer.from(wallet.privateKey, 'hex')
      );
      chrome.runtime.sendMessage(
        {
          method: 'LUNIE_SIGN_REQUEST_RESPONSE',
          data: {
            signature: signature,
            publicKey: Buffer.from(wallet.publicKey, 'hex'),
          },
        },
        function(response) {
          console.log(response);
        }
      );
    } catch (err) {
      setPassword('');
      setError(true);
    }
  }

  function passWordChange(e) {
    setPassword(e.target.value);
    setError(false);
  }

  const [password, setPassword] = React.useState('');
  return (
    <div className="session-approve">
      <h2>Approve Transaction</h2>
      <br />
      <div className="from">
        From
        <div className="bech32-address">
          <div className="address">
            <CopyToClipboard
              text={props.senderAddress}
              // onCopy={() => setCopied()}
            >
              <span>
                {props.senderAddress.substr(0, 6) +
                  '...' +
                  props.senderAddress.substr(
                    props.senderAddress.length - 4,
                    props.senderAddress.length - 1
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
              <img src={color} alt="cosmic atom token" className="banking" />
            </div>
            <div data-v-bc107f32="" className="tx__content">
              <div className="tx__content__left">
                <div className="tx__content__caption">
                  <p>
                    Sent
                    <b> 0.1</b>
                    <span> CLR</span>
                  </p>
                </div>
                <div className="tx__content__information">
                  To&nbsp;
                  <div className="bech32-address">
                    <div className="address">
                      <CopyToClipboard
                        text={props.latestSignReq.msgs[0].value.to_address}
                        // onCopy={() => setCopied()}
                      >
                        <span>
                          {props.latestSignReq.msgs[0].value.to_address.substr(
                            0,
                            6
                          ) +
                            '...' +
                            props.latestSignReq.msgs[0].value.to_address.substr(
                              props.latestSignReq.msgs[0].value.to_address
                                .length - 4,
                              props.latestSignReq.msgs[0].value.to_address
                                .length - 1
                            )}
                        </span>
                      </CopyToClipboard>
                    </div>
                    <div className="copied">
                      <i className="material-icons">check</i>
                    </div>
                  </div>
                  <span>&nbsp;- (Sent via Color Wallet)</span>
                </div>
              </div>
            </div>
          </div>
          <div className="approval-table">
            <ul className="table-invoice">
              <li>
                <span>Subtotal</span>
                <span>{fullDecimals(subtotal)}&nbsp;CLR</span>
              </li>
              <li>
                <span>Network Fee</span>
                <span>{fullDecimals(networkfee)}&nbsp;CLR</span>
              </li>
              <li className="total-row">
                <span>Total</span>
                <span>{fullDecimals(total)}&nbsp;CLR</span>
              </li>
            </ul>
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
                value={password}
                onChange={(e) => passWordChange(e)}
              />
            </div>
            <div>{error && 'Password Incorrect'}</div>
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
              onClick={() =>
                signWithExtension(
                  props.latestSignReq.msgs[0].value.from_address,
                  password,
                  {
                    chain_id: props.latestSignReq.chain_id,
                    account_number: props.latestSignReq.account_number,
                    sequence: props.latestSignReq.sequence,
                    fee: props.latestSignReq.fee,
                    msgs: props.latestSignReq.msgs,
                    memo: props.latestSignReq.memo,
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
  );
}
