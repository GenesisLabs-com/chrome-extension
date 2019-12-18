import React, { useEffect, Suspense, lazy } from 'react';
const Home = lazy(() => import('./home/home'));
const SeeExistingAccounts = lazy(() =>
  import('./seeExistingAccounts/seeExistingAccounts')
);
const SignExtension = lazy(() => import('./signExtension/signExtension'));
const SubmitProposal = lazy(() =>
  import('./submitProposal/submitProposal.jsx')
);
const Delegate = lazy(() => import('./delegate/delegate'));
const Undelegate = lazy(() => import('./undelegate/undelegate'));
const Vote = lazy(() => import('./vote/vote'));
const RedeleGate = lazy(() => import('./beginredelegate/beginredelegate'));
const WithDrawDelegationReward = lazy(() =>
  import('./withdrawdelegationreward/withdrawdelegationreward')
);
const SignedMessage = lazy(() => import('./signedMessage/signedMessage'));

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
  const [senderAddress, setSender] = React.useState(undefined);

  useEffect(() => {
    let temp = localStorage.getItem('latestSignReq');
    let tempS = localStorage.getItem('senderAddress');
    console.log(tempS);
    temp = JSON.parse(temp);
    if (temp !== null) {
      setLatest(temp);
    }
    if (tempS !== null) {
      setSender(tempS);
    }
  }, []);
  const usersExist = allStorage();
  console.log(latestSignReq, 'index');
  return (
    <React.Fragment>
      <Suspense fallback={<div>Loading....</div>}>
        {latestSignReq === undefined ? (
          usersExist.length !== 0 ? (
            <SeeExistingAccounts logo={props.logo} />
          ) : (
            <Home logo={props.logo} />
          )
        ) : latestSignReq.msgs[0].type === 'color/MsgSend' ? (
          <SignExtension senderAddress={senderAddress} />
        ) : latestSignReq.msgs[0].type === 'color/MsgSubmitProposal' ? (
          <SubmitProposal />
        ) : latestSignReq.msgs[0].type === 'color/MsgDelegate' ? (
          <Delegate />
        ) : latestSignReq.msgs[0].type === 'color/MsgUndelegate' ? (
          <Undelegate />
        ) : latestSignReq.msgs[0].type === 'color/MsgBeginRedelegate' ? (
          <RedeleGate />
        ) : latestSignReq.msgs[0].type === 'color/MsgVote' ? (
          <Vote />
        ) : latestSignReq.msgs[0].type ===
          'color/MsgWithdrawDelegationReward' ? (
          <WithDrawDelegationReward />
        ) : latestSignReq.msgs[0].type === 'color/SignedMessage' ? (
          <SignedMessage />
        ) : (
          <div>Error</div>
        )}
      </Suspense>
    </React.Fragment>
  );
}
