export default function Joinemail({ emailinput, onNextClick }) {
    return (
        <div>
            <h2 className='memberguide'>
                <div className='joinalert'>
                    <div className='confirmemail'>
                        {emailinput} <br />
                    </div>
                    This email is a unregistered email. <br />
                    Do you want to start the sign-up process?
                </div>
                <button onClick={onNextClick} className='embtn'>Sign up by this Email</button>
            </h2>
        </div>
    );
}
