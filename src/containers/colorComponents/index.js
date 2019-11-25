import React from "react";
import Home from "./home/home.jsx";
import SeeExistingAccounts from "./seeExistingAccounts/seeExistingAccounts.jsx";

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
  // window.addEventListener("message", function(event) {
  //   // We only accept messages from ourselves
  //   if (event.source != window) return;

  //   if (event.data.type && event.data.type == "FROM_PAGE") {
  //     console.log("Content script received message: " + event.data.text);
  //   }
  // });
  const usersExist = allStorage();
  return (
    <div>
      {usersExist.length !== 0 ? (
        <SeeExistingAccounts logo={props.logo} />
      ) : (
        <Home logo={props.logo} />
      )}
    </div>
  );
}
