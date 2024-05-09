
export default function Joincomplete(Props) {

    return (
        <>
            <div>
                <h2 className='memberguide'>
                    <div>Sign up procedure Complete</div>
                </h2>
            </div>
            <br />
            <div className='confirmemail'>
                <div>Congratulations on your membership.<br />
                    Log in and try the service.</div>
                    The e-mail you signed up for is <br/><br/>
                    [{Props.emailinput}]
            </div>

        </>
    )
}