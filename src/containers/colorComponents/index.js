import React, { useEffect } from 'react';
import Home from './home/home.jsx';
import SeeExistingAccounts from './seeExistingAccounts/seeExistingAccounts.jsx';
import SignExtension from './signExtension/signExtension.jsx';
export default function Index(props) {
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

  const [latestSignReq, setLatest] = React.useState(undefined);
  useEffect(() => {
    let temp = localStorage.getItem('latestSignReq');
    temp = JSON.parse(temp);
    console.log(temp);
    if (temp !== null) {
      setLatest(temp);
    }
  }, []);
  const usersExist = allStorage();

  return (
    <React.Fragment>
      {latestSignReq === undefined ? (
        usersExist.length !== 0 ? (
          <SeeExistingAccounts logo={props.logo} />
        ) : (
          <Home logo={props.logo} />
        )
      ) : (
        <SignExtension
          latestSignReq={latestSignReq}
          // senderAddress={senderAddress}
        />
      )}
    </React.Fragment>
  );
}
