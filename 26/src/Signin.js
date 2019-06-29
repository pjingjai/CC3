import React from 'react';

class Signin extends React.Component {
    emailInput = React.createRef();
    passwordInput = React.createRef();
    handleClick = async e => {
        e.preventDefault();
        if (this.passwordInput.current.value.length < 3) {
            alert('password too short');
        } else {
            try {
                const response = await fetch('http://localhost:8000/api/v1/auth/signin', {
                    method: 'post',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({
                        email: this.emailInput.current.value,//'pokem0n777@gg.com',
                        password: this.passwordInput.current.value//'diglett'
                    })
                });
                const data = await response.json();
                if (response.status !== 200) {
                    throw new Error(response.status + ' ' + JSON.stringify(data))
                }
                await this.setState({ isAuth: true });
                alert('ok' + JSON.stringify(data) + this.state.isAuth);
                this.props.history.push('/');
            } catch (err) {
                alert(err);
            }
        }
    }

    render () {
        return (
            <form>
                <input type='email' ref={this.emailInput} />
                <input type='password' ref={this.passwordInput} />
                <button onClick={this.handleClick}>Sign In</button>
            </form>
        );
    }
}

export default Signin;