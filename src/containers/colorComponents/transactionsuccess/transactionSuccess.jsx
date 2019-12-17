import React from 'react';
import { goTo } from 'react-chrome-extension-router';

import SeeExistingAccounts from '../seeExistingAccounts/seeExistingAccounts';

console.log('ransaction success');
export default function TransactionSuccess() {
  return (
    <div className="session-success">
      <h2>Transaction Complete</h2>{' '}
      <div>
        <p>You successfully signed the transaction.</p>
      </div>
      <div className="session-footer">
        <button
          style={{
            width: '100%',
            borderRadius: '7px',
            backgroundColor: '#0a73b1',
            fontWeight: 400,
            height: '20px',
            color: 'white',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.5s ease',
          }}
          onClick={() => goTo(SeeExistingAccounts)}
          className=""
        >
          View Accounts
        </button>
      </div>
    </div>
  );
}
