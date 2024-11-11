export function ADB2CTestSignIn() {
  return (
    <>
      <div class='heading'>
        <h1 role='heading'>User Details</h1>
      </div>
      <div class='buttons'></div>
      <div class='intro'>
        <p>Please provide the following details.</p>
      </div>
      <form id='attributeVerification'>
        <div
          id='requiredFieldMissing'
          class='error pageLevel'
          style='display: none;'
          aria-hidden='true'
        >
          A required field is missing. Please fill out all required fields and try again.
        </div>
        <div
          id='fieldIncorrect'
          class='error pageLevel'
          style='display: none;'
          aria-hidden='true'
        >
          One or more fields are filled out incorrectly. Please check your entries and try again.
        </div>
        <div
          id='captchaUnresolved'
          class='error pageLevel'
          style='display: none;'
          aria-hidden='true'
        >
          Captcha challenge is not resolved. Please solve it to proceed.
        </div>
        <div
          id='claimVerificationServerError'
          class='error pageLevel'
          style='display: none;'
          aria-hidden='true'
        >
        </div>
        <div id='attributeList' class='attr'>
          <ul>
            <li class='VerificationControl emailVerificationControl_li'>
              <div class='attrEntry'>
                <label
                  id='emailVerificationControl_label'
                  for='emailVerificationControl'
                  class=''
                >
                </label>
                <div class='error itemLevel' role='alert'></div>
                <div
                  class='verificationControlContent'
                  id='emailVerificationControl'
                >
                  <div class='verificationInfoText'>
                    <div
                      id='emailVerificationControl_info_message'
                      aria-hidden='true'
                      role='alert'
                      aria-label='Verification is necessary. Please click Send button.'
                      style='display: none;'
                    >
                      Verification is necessary. Please click Send button.
                    </div>
                  </div>
                  <div class='verificationSuccessText'>
                    <div
                      id='emailVerificationControl_success_message'
                      aria-hidden='false'
                      role='alert'
                      aria-label='Verification code has been sent to your inbox. Please copy it to the input box below.'
                      style='display: inline;'
                    >
                      Verification code has been sent to your inbox. Please copy it to the input box
                      below.
                    </div>
                  </div>
                  <div class='verificationErrorText error'>
                    <div
                      id='emailVerificationControl_error_message'
                      aria-hidden='true'
                      role='alert'
                      aria-label=''
                      style='display: none;'
                    >
                    </div>
                  </div>
                  <ul>
                    <li
                      class='EmailBox email_li email'
                      aria-hidden='false'
                      style='display: inline;'
                    >
                      <div class='attrEntry'>
                        <label id='email_label' for='email' class='required'>
                          Email Address
                        </label>
                        <div
                          class='error itemLevel'
                          role='alert'
                          aria-hidden='true'
                          aria-label=''
                        >
                        </div>
                        <input
                          id='email'
                          class='textInput'
                          type='email'
                          placeholder='Email Address'
                          pattern="^[a-zA-Z0-9!#$%&amp;'+^_`{}~-]+(?:\.[a-zA-Z0-9!#$%&amp;'+^_`{}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$"
                          title='Email address that can be used to contact you.'
                          aria-required='true'
                          autofocus
                        />
                        <a
                          class='helpLink tiny'
                          href='javascript:void(0)'
                          data-help='Email address that can be used to contact you.'
                        >
                          What is this?
                        </a>
                      </div>
                    </li>
                    <li
                      class='TextBox emailVerificationCode_li VerificationCode'
                      aria-hidden='false'
                      style='display: inline;'
                    >
                      <div class='attrEntry'>
                        <label
                          id='emailVerificationCode_label'
                          for='emailVerificationCode'
                          class='required'
                        >
                          Verification Code
                        </label>
                        <div
                          class='error itemLevel'
                          role='alert'
                          aria-hidden='true'
                          aria-label=''
                        >
                        </div>
                        <input
                          id='emailVerificationCode'
                          class='textInput'
                          type='text'
                          placeholder='Verification Code'
                          title='Enter your verification code'
                          aria-required='true'
                          autocomplete='off'
                        />
                        <a
                          class='helpLink tiny'
                          href='javascript:void(0)'
                          data-help='Enter your verification code'
                        >
                          What is this?
                        </a>
                      </div>
                    </li>
                  </ul>
                  <div
                    class='working'
                    style='display: none;'
                    aria-hidden='true'
                    aria-label='Please wait'
                    aria-live='assertive'
                    role='alert'
                  >
                  </div>
                  <div class='buttons'>
                    <button
                      class='sendCode'
                      id='emailVerificationControl_but_send_code'
                      type='button'
                      aria-label='Send verification code'
                      aria-hidden='true'
                      style='display: none;'
                    >
                      Send verification code
                    </button>
                    <button
                      class='verifyCode'
                      id='emailVerificationControl_but_verify_code'
                      type='button'
                      aria-label='Verify code'
                      aria-hidden='false'
                      style='display: inline;'
                    >
                      Verify code
                    </button>
                    <button
                      class='sendNewCode'
                      id='emailVerificationControl_but_send_new_code'
                      type='button'
                      aria-label='Send new code'
                      aria-hidden='false'
                      style='display: inline;'
                    >
                      Send new code
                    </button>
                    <button
                      class='changeClaims'
                      id='emailVerificationControl_but_change_claims'
                      type='button'
                      aria-label='Change e-mail'
                      aria-hidden='true'
                      style='display: none;'
                    >
                      Change e-mail
                    </button>
                  </div>
                </div>
                <a class='helpLink tiny' href='javascript:void(0)'>
                  What is this?
                </a>
              </div>
            </li>
            <li class='Password newPassword_li'>
              <div class='attrEntry'>
                <label
                  id='newPassword_label'
                  for='newPassword'
                  class='required'
                >
                  New Password
                </label>
                <div class='error itemLevel' role='alert'></div>
                <input
                  id='newPassword'
                  class='textInput'
                  type='password'
                  placeholder='New Password'
                  title='Enter new password'
                  autocomplete='new-password'
                  aria-required='true'
                  aria-disabled='true'
                  disabled
                  tabindex={-1}
                />
                <a
                  class='helpLink tiny'
                  href='javascript:void(0)'
                  data-help='Enter new password'
                >
                  What is this?
                </a>
              </div>
            </li>
            <li class='Password reenterPassword_li'>
              <div class='attrEntry'>
                <label
                  id='reenterPassword_label'
                  for='reenterPassword'
                  class='required'
                >
                  Confirm New Password
                </label>
                <div class='error itemLevel' role='alert'></div>
                <input
                  id='reenterPassword'
                  class='textInput'
                  type='password'
                  placeholder='Confirm New Password'
                  title='Confirm new password'
                  autocomplete='new-password'
                  aria-required='true'
                  aria-disabled='true'
                  disabled
                  tabindex={-1}
                />
                <a
                  class='helpLink tiny'
                  href='javascript:void(0)'
                  data-help='Confirm new password'
                >
                  What is this?
                </a>
              </div>
            </li>
          </ul>
        </div>
        <div class='buttons'>
          <button
            id='continue'
            type='submit'
            form='attributeVerification'
            aria-disabled='true'
            aria-label='Create'
            tabindex={-1}
          >
            Create
          </button>
          <button id='cancel' aria-label='Cancel' formnovalidate>
            Cancel
          </button>
        </div>

        <div
          class='verifying-modal'
          aria-live='assertive'
          aria-labelledby='verifying_blurb'
        >
          <div id='verifying_blurb'></div>
        </div>
      </form>
    </>
  );
}
