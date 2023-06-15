<form onSubmit={onSignUpHendler} >
<div className="" style={{ marginTop: "2vw" }}>
    <div style={{ marginLeft: "1.5vw" }}>







        <div className="div1 mt-1">

            <input className="input1" type="password" name="password" required="" id="password" placeholder="Enter password" minLength={8} maxLength={16} onKeyUp={passwordHendler} onChange={(event) => setPassword(event.target.value)} />
            <label className="form-label label1">Password</label>
            {passErr ? <small style={{ color: "red" }} >Invalid password</small> : ""}

        </div>

        <div className="div1 mt-1">

            <input className="input1" type="password" name="confirmPassword" required="" id="password" placeholder="Enter Confirm Password" minLength={8} maxLength={16} onKeyUp={confirmPasswordHendler} />
            <label className="form-label label1">Confirm Password</label>
            {confirmpassErr ? <small style={{ color: "red" }} >Password not match</small> : ""}

        </div>



        <div style={{ fontSize: 16, marginTop: "2vw" }} >
            <button type="submit" className="btn p-2" id="signinBtn" > Submit </button>


        </div>
        <div className="signup">have an account? <span><a className="signuplink linkHover" onClick={funReturn} >Log in</a></span></div>
    </div>
</div>
</form>