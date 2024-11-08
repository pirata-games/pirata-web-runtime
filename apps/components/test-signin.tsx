export function ADB2CTestSignIn() {
  return (
    <>
      <div class='heading'>
        <h1 role='heading'>Sign in</h1>
      </div>
      <form
        id='localAccountForm'
        class='localAccount'
        aria-label='Sign in with your email address'
      >
        <div class='intro'>
          <h2>Sign in with your email address</h2>
        </div>
        <div class='error pageLevel' aria-hidden='true' role='alert'>
          <p></p>
        </div>
        <div class='entry'>
          <div class='entry-item'>
            <label for='email'>Email Address</label>
            <div class='error itemLevel' aria-hidden='true' role='alert'>
              <p></p>
            </div>
            <input
              type='email'
              id='email'
              name='Email Address'
              title='Please enter a valid email address'
              pattern="^[a-zA-Z0-9!#$%&amp;'+^_`{}~-]+(?:\.[a-zA-Z0-9!#$%&amp;'+^_`{}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$"
              autofocus={true}
              placeholder='Email Address'
              aria-label='Email Address'
            />
          </div>
          <div class='entry-item'>
            <div class='password-label'>
              <label for='password'>Password</label>
              <a
                id='forgotPassword'
                href='/piratagames.onmicrosoft.com/B2C_1_PirataGamesSignUpSignIn/api/CombinedSigninAndSignup/forgotPassword?csrf_token=aXdQZE5kNkYyWUhOZElqSmI0NUtKcTQ0WEFPUjI5TU1tREJPRStMc0hFWkVoMWQ5ellwYTcrNHgrZ3EwZjQ4VXhHU29Cb2VNcnhENG9QbWZpSFlJOXc9PTsyMDI0LTExLTA4VDE5OjQzOjM2Ljg1Njk3MDJaO2lWSzhEcHlWQnNtL1ZEaUdqcnNrTnc9PTt7Ik9yY2hlc3RyYXRpb25TdGVwIjoxfQ==&amp;tx=StateProperties=eyJUSUQiOiI2MTllNGU0OC02N2Q4LTRmOWEtOGUxNC0zMmY5NzFlOTkwMzUifQ&amp;p=B2C_1_PirataGamesSignUpSignIn'
              >
                Forgot your password?
              </a>
            </div>
            <div class='error itemLevel' aria-hidden='true'>
              <p role='alert'></p>
            </div>
            <input
              type='password'
              id='password'
              name='Password'
              placeholder='Password'
              aria-label='Password'
              autocomplete='current-password'
              aria-required='true'
            />
          </div>

          <div class='working'></div>

          <div class='buttons'>
            <button id='next' type='submit' form='localAccountForm'>
              Sign in
            </button>
          </div>
        </div>
        <div class='divider'>
          <h2>OR</h2>
        </div>
        <div class='create'>
          <p>
            Don't have an account?
            <a
              id='createAccount'
              href='/piratagames.onmicrosoft.com/B2C_1_PirataGamesSignUpSignIn/api/CombinedSigninAndSignup/unified?local=signup&amp;csrf_token=aXdQZE5kNkYyWUhOZElqSmI0NUtKcTQ0WEFPUjI5TU1tREJPRStMc0hFWkVoMWQ5ellwYTcrNHgrZ3EwZjQ4VXhHU29Cb2VNcnhENG9QbWZpSFlJOXc9PTsyMDI0LTExLTA4VDE5OjQzOjM2Ljg1Njk3MDJaO2lWSzhEcHlWQnNtL1ZEaUdqcnNrTnc9PTt7Ik9yY2hlc3RyYXRpb25TdGVwIjoxfQ==&amp;tx=StateProperties=eyJUSUQiOiI2MTllNGU0OC02N2Q4LTRmOWEtOGUxNC0zMmY5NzFlOTkwMzUifQ&amp;p=B2C_1_PirataGamesSignUpSignIn'
            >
              Sign up now
            </a>
          </p>
        </div>
      </form>
    </>
  );
}
