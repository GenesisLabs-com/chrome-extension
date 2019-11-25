import React from "react";
import { getStoredWallet } from "@rnssolution/color-keys";

export default function Test() {
  function allStorage() {
    var values = [],
      keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      values.push(localStorage.getItem(keys[i]));
    }

    return values;
  }

  const val = allStorage();
  console.log(val);

  // const wallet = getStoredWallet("abnsbcnsambcsnmbasncm", "12345678");
  // console.log(wallet);
  return <div>Test</div>;
}
