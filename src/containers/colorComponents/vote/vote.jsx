import React from 'react';

let latestSignReq = localStorage.getItem('latestSignReq');
latestSignReq = JSON.parse(latestSignReq);

console.log('vote', latestSignReq);

export default function Vote() {
  return (
    <div>
      <div class="session-approve">
        <h2>Approve Transaction</h2>
        <br />
        <div class="from">
          From
          <div class="bech32-address">
            <div class="address">colors…4xlm</div>
            <div class="copied">
              <i class="material-icons">check</i>
            </div>
          </div>
        </div>
        <div class="tm-form-group">
          <div class="tm-form-group__field">
            <div class="tx">
              <div class="tx__icon">
                <img
                  src="/images/color.svg"
                  alt="cosmic atom token"
                  class="governance"
                />
              </div>
              <div class="tx__content">
                <div
                  session-address="colors18mdxmk4cqdna47hu68g5snsz8zgrw357pn4xlm"
                  class="tx__content__left"
                >
                  <div class="tx__content__caption">
                    <p>Voted&nbsp;Yes</p>
                  </div>
                  <div class="tx__content__information">
                    On&nbsp;
                    <a class="">Proposal #6</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="action-modal-group tm-form-group">
              <label for="password" class="tm-form-group__label">
                Password
              </label>
              <div class="tm-form-group__field">
                <input
                  type="password"
                  placeholder="Password"
                  class="tm-field"
                  id="password"
                />
              </div>
            </div>
            <div class="session-approve-footer">
              <button class="button left-button secondary" id="reject-btn">
                Reject
              </button>
              <button class="button right-button" id="approve-btn">
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
