import React from 'react';

let latestSignReq = localStorage.getItem('latestSignReq');
latestSignReq = JSON.parse(latestSignReq);

console.log('withdrawdelegationreward', latestSignReq);
export default function Withdrawdelegationreward() {
  return (
    <div>
      <div className="session-approve">
        <h2>Approve Transaction</h2>
        <br />
        <div className="from">
          From
          <div className="bech32-address">
            <div className="address">colors…4xlm</div>
            <div className="copied">
              <i className="material-icons">check</i>
            </div>
          </div>
        </div>
        <div className="tm-form-group">
          <div className="tm-form-group__field">
            <div className="tx">
              <div className="tx__icon">
                <img
                  src="/images/color.svg"
                  alt="Colors atom token"
                  className="distribution"
                />
              </div>
              <div className="tx__content">
                <div
                  session-address="colors18mdxmk4cqdna47hu68g5snsz8zgrw357pn4xlm"
                  className="tx__content__left"
                >
                  <div className="tx__content__caption">
                    <p>Withdrawal</p>
                  </div>
                  <div className="tx__content__information">
                    From&nbsp;
                    <a className="">
                      colorsvaloper1pkw3h2hv9476wvjefyzfvhra0qgglf4c3j435z
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="action-modal-group tm-form-group">
              <label for="password" className="tm-form-group__label">
                Password
              </label>
              <div className="tm-form-group__field">
                <input
                  type="password"
                  placeholder="Password"
                  className="tm-field"
                  id="password"
                />
              </div>
            </div>
            <div className="session-approve-footer">
              <button className="button left-button secondary" id="reject-btn">
                Reject
              </button>
              <button className="button right-button" id="approve-btn">
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
