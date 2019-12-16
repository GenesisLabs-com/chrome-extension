import React, { useEffect, Suspense, lazy } from 'react';
const Home = lazy(() => import('./home/home'));
// import Home from './home/home.jsx';
const SeeExistingAccounts = lazy(() =>
  import('./seeExistingAccounts/seeExistingAccounts')
);
// import SeeExistingAccounts from './seeExistingAccounts/seeExistingAccounts.jsx';
const SignExtension = lazy(() => import('./signExtension/signExtension'));
// import SignExtension from './signExtension/signExtension.jsx';
const SubmitProposal = lazy(() =>
  import('./submitProposal/submitProposal.jsx')
);
// import SubmitProposal from './submitProposal/submitProposal.jsx';
const Delegate = lazy(() => import('./delegate/delegate'));
// import Delegate from './delegate/delegate.jsx';
const Undelegate = lazy(() => import('./undelegate/undelegate'));
// import Undelegate from './undelegate/undelegate.jsx';
const Vote = lazy(() => import('./vote/vote'));
// import Vote from './vote/vote.jsx';
const RedeleGate = lazy(() => import('./beginredelegate/beginredelegate'));
// import RedeleGate from './beginredelegate/beginredelegate.jsx';
const WithDrawDelegationReward = lazy(() =>
  import('./withdrawdelegationreward/withdrawdelegationreward')
);
// import WithDrawDelegationReward from './withdrawdelegationreward/withdrawdelegationreward.jsx';

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
        ) : latestSignReq.msgs[0].type === 'cosmos-sdk/MsgSend' ? (
          <SignExtension senderAddress={senderAddress} />
        ) : latestSignReq.msgs[0].type === 'cosmos-sdk/MsgSubmitProposal' ? (
          <SubmitProposal />
        ) : latestSignReq.msgs[0].type === 'cosmos-sdk/MsgDelegate' ? (
          <Delegate />
        ) : latestSignReq.msgs[0].type === 'cosmos-sdk/MsgUndelegate' ? (
          <Undelegate />
        ) : latestSignReq.msgs[0].type === 'cosmos-sdk/MsgBeginRedelegate' ? (
          <RedeleGate />
        ) : latestSignReq.msgs[0].type === 'cosmos-sdk/MsgVote' ? (
          <Vote />
        ) : latestSignReq.msgs[0].type ===
          'cosmos-sdk/MsgWithdrawDelegationReward' ? (
          <WithDrawDelegationReward />
        ) : (
          <div>message not defined</div>
        )}
      </Suspense>
    </React.Fragment>
  );
}
