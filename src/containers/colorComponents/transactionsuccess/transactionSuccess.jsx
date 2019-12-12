import React from 'react';
import { goTo } from 'react-chrome-extension-router';

import Home from '../home/home.jsx';
export default function TransactionSuccess() {
  return (
    <div className="session-success">
      <h2>Transaction Complete</h2>{' '}
      <div>
        <p>You successfully signed the transaction.</p>
      </div>
      <div className="session-footer">
        <button onClick={() => goTo(Home)} className="">
          View Accounts
        </button>
      </div>
    </div>
  );
}
