/*global chrome*/
import React, { useEffect } from 'react';
import { Link } from 'react-chrome-extension-router';

//components
import CreateAddress from '../createaddress/createaddress.jsx';
import RecoverWithBackup from '../recoverwithBackup/recoverwithBackup.jsx';
import SeeExsistingAccounts from '../seeExistingAccounts/seeExistingAccounts.jsx';

import colorplatform from '../../../assets/img/color-platform.svg';

export default function Home() {
  return (
    <div className="session-frame">
      <a href="#/" className="router-link-active">
        <img
          src={colorplatform}
          alt="color platform"
          className="session-logo"
        />
      </a>
      <div className="session-outer-container">
        <div className="session">
          <div id="session-welcome">
            <img
              src={colorplatform}
              alt="color platform"
              className="lunie-logo"
            />
            <button onClick={() => sendMessage()}>Send</button>
            <div className="session-list">
              <Link
                // href="#/create"
                component={CreateAddress}
                className="tm-li-session"
                id="create-new-address"
              >
                <div className="tm-li-session-icon">
                  <i className="material-icons circle">person_add</i>
                </div>
                <div className="tm-li-session-text">
                  <div className="tm-li-session-title">
                    <span>Create a new address</span>
                  </div>
                </div>{' '}
                <div className="tm-li-session-icon">
                  <i className="material-icons">arrow_forward</i>
                </div>
              </Link>
              <Link
                component={RecoverWithBackup}
                className="tm-li-session"
                id="recover-with-backup"
              >
                <div className="tm-li-session-icon">
                  <i className="material-icons circle">
                    settings_backup_restore
                  </i>
                </div>
                <div className="tm-li-session-text">
                  <div className="tm-li-session-title">
                    <span>Recover with backup code</span>
                  </div>
                </div>
                <div className="tm-li-session-icon">
                  <i className="material-icons">arrow_forward</i>
                </div>
              </Link>
              <Link
                component={SeeExsistingAccounts}
                className="tm-li-session"
                id="see-accounts"
              >
                <div className="tm-li-session-icon">
                  <i className="material-icons circle">person</i>
                </div>{' '}
                <div className="tm-li-session-text">
                  <div className="tm-li-session-title">
                    <span>See existing accounts</span>
                  </div>
                </div>{' '}
                <div className="tm-li-session-icon">
                  <i className="material-icons">arrow_forward</i>
                </div>
              </Link>
            </div>
            <p className="footnote">
              By using Color Wallet, you accept our
              <a
                href="https://wallet.testnet.color-platform.org/#/terms"
                target="_blank"
                rel="nofollow noreferrer noopener"
              >
                Terms of Service
              </a>
              and
              <a
                href="https://wallet.testnet.color-platform.org/#/privacy"
                target="_blank"
                rel="nofollow noreferrer noopener"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>{' '}
      <button
        data-v-21b3c012=""
        className="button session-close"
        color="secondary"
      >
        Back to Color Wallet
      </button>
    </div>
  );
}
