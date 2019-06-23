import React from 'react';

class User extends React.Component {
    render (props) {
        return (
            <div>
                <div>
                    <img src={this.props.image}/>
                </div>
                <p>email: {this.props.email}</p>
                <p>gender: {this.props.gender}</p>
                <p>{this.props.name}</p>
            </div>
        );
    };
}

export default User;