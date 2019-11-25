/*global chrome*/
import React from 'react';
import { goBack, goTo } from 'react-chrome-extension-router';
import {
  getSeed,
  getNewWalletFromSeed,
  storeWallet,
} from '@rnssolution/color-keys';

import SeeExsistingAccounts from '../seeExistingAccounts/seeExistingAccounts.jsx';

import colorplatform from '../../../assets/img/color-platform.svg';
//components

//bip39
// const bip39 = require("bip39");

export default function Home() {
  const [values, setValues] = React.useState({
    accountname: '',
    password: '',
    confirmpassword: '',
    address: '',
  });

  const [mnemonic] = React.useState(getSeed());
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  function createNewAddress(e) {
    e.preventDefault();
    const wallet = getNewWalletFromSeed(mnemonic);
    chrome.runtime.sendMessage(
      {
        method: 'setextensionaddress',
        data: {
          wallet: wallet,
          accountname: values.accountname,
          password: values.password,
        },
      },
      function(response) {
        console.log(response);
        if (response.status === 'failed') {
          goTo(SeeExsistingAccounts);
        } else {
          goTo(SeeExsistingAccounts);
        }
      }
    );
    // try {
    //   storeWallet(wallet, values.accountname, values.password);
    //   goTo(SeeExsistingAccounts);
    // } catch (err) {
    //   console.log(err.message);
    //   goTo(SeeExsistingAccounts);
    // }
  }

  // function getWallet(e) {
  //   e.preventDefault();
  //   console.log(getStoredWallet());
  // }
  return (
    <div className="session-frame">
      <a href="#/" className="router-link-active">
        <img src={colorplatform} alt="color logo" className="session-logo" />
      </a>
      <div className="session-outer-container">
        <div className="session">
          <button
            onClick={() => goBack()}
            style={{
              background: 'transparent',
              border: 'none',
              boxShadow: 'none',
            }}
          >
            <i className="material-icons session-back">arrow_back</i>
          </button>

          <form className="form">
            <main className="form-main">
              <h2 className="session-title">Create a new address</h2>
              <div className="session-main">
                <div className="danger-zone">
                  <h2>DANGER ZONE</h2>
                  <p>
                    Creating an address in the browser is not advised. This
                    feature is only enabled in insecure mode for testing
                    purposes and should not be used otherwise.
                  </p>
                </div>
                <div className="tm-form-group">
                  <label className="tm-form-group__label">Account Name</label>
                  <div className="tm-form-group__field">
                    <input
                      value={values.accountname}
                      onChange={handleChange('accountname')}
                      type="text"
                      placeholder="Must be at least 5 characters"
                      className="tm-field"
                      id="sign-up-name"
                    />
                  </div>
                </div>
                <div className="tm-form-group">
                  <label
                    // for="sign-up-password"
                    className="tm-form-group__label"
                  >
                    Password
                  </label>
                  <div className="tm-form-group__field">
                    <input
                      value={values.password}
                      onChange={handleChange('password')}
                      type="password"
                      placeholder="Must be at least 10 characters"
                      className="tm-field"
                      id="sign-up-password"
                    />
                  </div>
                </div>

                <div className="tm-form-group">
                  <label
                    // for="sign-up-password-confirm"
                    className="tm-form-group__label"
                  >
                    Confirm Password
                  </label>
                  <div className="tm-form-group__field">
                    <input
                      value={values.confirmpassword}
                      onChange={handleChange('confirmpassword')}
                      type="password"
                      placeholder="Enter password again"
                      className="tm-field"
                      id="sign-up-password-confirm"
                    />
                  </div>
                </div>
                <div className="sign-up-seed-group tm-form-group">
                  <label
                    // for="sign-up-seed"
                    className="tm-form-group__label"
                  >
                    Seed Phrase
                  </label>
                  <div className="tm-form-group__field">
                    <textarea
                      defaultValue={mnemonic}
                      readOnly
                      className="tm-field-seed tm-field"
                      style={{
                        overflow: 'hidden',
                        overflowWrap: 'break-word',
                        resize: 'none',
                        height: '98px',
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="session-footer">
                <button className="button" onClick={(e) => createNewAddress(e)}>
                  Create Address
                </button>
                {/* <button onClick={e => getWallet(e)}>Get</button> */}
              </div>
            </main>
          </form>
        </div>
      </div>
    </div>
  );
}
