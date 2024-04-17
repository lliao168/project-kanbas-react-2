

function TemplateLiterals () {
    const five = 2 + 3;
    const result1 = "2 + 3 = " + five;
    const result2 = `2 + 3 = ${2 + 3}`;
    const username = 'alice';
    const greeting1 = `Welcome home ${username}`;
    const loggedIn = false;
    const greeting2 = `Logged in: ${loggedIn ? "Yes" : "No"}`;
    return (
        <>
            <h3>Template Literals</h3>
            result1 = {result1}
            <br/>
            result2 = {result2}
            <br/>
            greeting1 = {greeting1}
            <br/>
            greeting2 = {greeting2}
        </>

    );
    
};

export default TemplateLiterals;