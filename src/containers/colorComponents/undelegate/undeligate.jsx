import React from 'react';

export default function Undelegate() {
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
                  alt="cosmic atom token"
                  className="staking"
                />
              </div>
              <div className="tx__content">
                <div
                  session-address="colors18mdxmk4cqdna47hu68g5snsz8zgrw357pn4xlm"
                  className="tx__content__left"
                >
                  <div className="tx__content__caption">
                    <p>
                      Undelegated
                      <b>1</b>
                      <span>&nbsp;CLR</span>
                    </p>
                  </div>
                  <div className="tx__content__information">
                    From&nbsp;
                    <a
                      href="#/validators/colorsvaloper1q6scldk68xpg4jez6a257ezxacv9alvy6g8jpt"
                      className=""
                    >
                      colorsvaloper1q6scldk68xpg4jez6a257ezxacv9alvy6g8jpt
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="approval-table">
              <ul className="table-invoice">
                <li>
                  <span>Subtotal</span>
                  <span> 1.000000 CLR </span>
                </li>
                <li>
                  <span>Network Fee</span>
                  <span>0.000142 CLR</span>
                </li>
                <li className="total-row">
                  <span>Total</span>
                  <span> 1.000142 CLR </span>
                </li>
              </ul>
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
              <button
                data-v-21b3c012=""
                className="button left-button secondary"
                id="reject-btn"
              >
                Reject
              </button>
              <button
                data-v-21b3c012=""
                className="button right-button"
                id="approve-btn"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}