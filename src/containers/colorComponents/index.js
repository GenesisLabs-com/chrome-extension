import React from "react";
import Home from "./home/home.jsx";
import SeeExistingAccounts from "./seeExistingAccounts/seeExistingAccounts.jsx";
import SignExtension from './signExtension/signExtension.jsx';


import { latestSignReq } from '../../pages/Background/index'
//import SignExtension from './signExtension/signExtension.jsx';
export default function Index(props) {
  function allStorage() {
    var values = [],
      keys = Object.keys(localStorage).map((type, key) => {
        if (type.includes("cosmos-wallets-colors")) {
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

  // useEffect(() => {

  // }, [])
  const usersExist = allStorage();
  console.log(latestSignReq, 'popup')
  return (
    <div>
      {
        latestSignReq.length === 0 ? usersExist.length !== 0 ? (
          <SeeExistingAccounts logo={props.logo} />
        ) : (
            <Home logo={props.logo} />
          )
          : <SignExtension />
      }
    </div>
  );
}