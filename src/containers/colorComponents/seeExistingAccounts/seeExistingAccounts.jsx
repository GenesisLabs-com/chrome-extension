/*global chrome*/
import React, { useEffect } from 'react';
import Home from '../home/home.jsx';
import { Link } from 'react-chrome-extension-router';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import colorplatform from '../../../assets/img/color-platform.svg';

export default function SeeExistingAccounts() {
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

  const [allData] = React.useState(allStorage());

  const [copied, setCopied] = React.useState();

  const handleCopied = (event, index) => {
    setCopied(index);
    setTimeout(() => setCopied(), 2000);
  };
  return (
    <div className="session-frame">
      <a href="#/" className="router-link-active">
        <img src={colorplatform} alt="color logo" className="session-logo" />
      </a>
      <div className="session-outer-container">
        <div className="session">
          <div className="session-container">
            <div className="accounts-header">
              <h2 className="session-title">
                <img
                  src={colorplatform}
                  alt="color logo"
                  className="lunie-logo"
                />
              </h2>
              <p>
                You can use the account(s) below to explore Color Wallet and to
                approve transactions.
              </p>
            </div>
            <div className="session-main">
              <ul className="account-list">
                {allData.map((account, key) => {
                  return (
                    <li className="account" key={account.address}>
                      <div className="account-info">
                        <h3>{account.name}</h3>
                        <div className="bech32-address">
                          <div className="address" id="TooltipExample">
                            <CopyToClipboard
                              text={account.address}
                              onCopy={(e) => handleCopied(e, key)}
                            >
                              <span>
                                {account.address.substr(0, 6) +
                                  '...' +
                                  account.address.substr(
                                    account.address.length - 4,
                                    account.address.length - 1
                                  )}
                              </span>
                            </CopyToClipboard>
                          </div>
                          {copied === key && (
                            <span style={{ color: 'green', fontSize: '10px' }}>
                              &nbsp;&#10004;&nbsp;Copied
                            </span>
                          )}
                        </div>
                      </div>
                      <a
                        href="https://localhost:9080/#/extension"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button
                          className="button account-button"
                          color="secondary"
                        >
                          Go to Color Wallet
                        </button>
                      </a>
                    </li>
                  );
                })}
                {/* <li className="account">
                  <div className="account-info">
                    <h3>abcdef</h3>
                    <div className="bech32-address">
                      <div className="address">colors…l22e</div>
                      <div className="copied">
                        <i className="material-icons">check</i>
                      </div>
                    </div>
                  </div>
                  <button className="button account-button" color="primary">
                    Go to Color Wallet
                  </button>
                </li> */}
              </ul>
            </div>
            <Link component={Home} className="back-link">
              Want to add another account?
            </Link>
          </div>
        </div>
      </div>
      <button className="button session-close" color="secondary">
        Back to Color Wallet
      </button>
    </div>
  );
}
