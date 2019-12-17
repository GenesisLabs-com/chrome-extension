import React from 'react';
import { Link } from 'react-chrome-extension-router';

import SeeExistingAccounts from '../seeExistingAccounts/seeExistingAccounts';

export default function TransactionSuccess() {
  return (
    <div className="session-success">
      <h2>Transaction Complete</h2>{' '}
      <div>
        <p>You successfully signed the transaction.</p>
      </div>
      <div className="session-footer">
        <Link component={SeeExistingAccounts} className="back-link">
          View Accounts
        </Link>
      </div>
    </div>
  );
}
