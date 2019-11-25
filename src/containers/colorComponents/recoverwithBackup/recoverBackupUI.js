/*global chrome*/
import React from 'react';
import { goBack } from 'react-chrome-extension-router';

import colorplatform from '../../../assets/img/color-platform.svg';

export default function RecoverWithBackupUI() {
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
              <h2 className="session-title">Recover with backup code</h2>
              <div className="session-main">
                <div className="tm-form-group">
                  <label htmlFor="import-name" className="tm-form-group__label">
                    Account Name
                  </label>
                  <div className="tm-form-group__field">
                    <input
                      type="text"
                      placeholder="Must have at least 5 characters"
                      className="tm-field"
                      id="import-name"
                      vue-focus="vue-focus"
                    />
                  </div>
                </div>
                <div className="tm-form-group">
                  <label
                    htmlFor="import-password"
                    className="tm-form-group__label"
                  >
                    Password
                  </label>
                  <div className="tm-form-group__field">
                    <input
                      type="password"
                      placeholder="Must be at least 10 characters"
                      className="tm-field"
                      id="import-password"
                    />
                  </div>
                </div>
                <div className="tm-form-group">
                  <label
                    htmlFor="import-password-confirmation"
                    className="tm-form-group__label"
                  >
                    Confirm Password
                  </label>
                  <div className="tm-form-group__field">
                    <input
                      type="password"
                      placeholder="Enter password again"
                      className="tm-field"
                      id="import-password-confirmation"
                    />
                  </div>
                </div>
                <div className="tm-form-group">
                  <label htmlFor="import-seed" className="tm-form-group__label">
                    Backup code
                  </label>
                  <div className="tm-form-group__field">
                    <textarea
                      className="tm-field-seed tm-field"
                      id="import-seed"
                      placeholder="Must be exactly 24 words"
                      style={{
                        overflow: 'hidden',
                        overflowWrap: 'break-word',
                        resize: 'none',
                        height: '64px',
                      }}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="session-footer">
                <button className="button">Recover</button>
              </div>
            </main>
          </form>
        </div>
      </div>
      <button className="button session-close" color="secondary">
        Back to Color Wallet
      </button>
    </div>
  );
}
