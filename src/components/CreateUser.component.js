import React from "react"
import axios from 'axios'

class CreateUser extends React.Component {
    state = {
        username: '',
    }

    handleChangeUsername = (e) => {
        this.setState({
            username: e.target.value,
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        const user = {
            username: this.state.username,
            
        }
        console.log(user)
        axios.post('http://localhost:5000/users/add', user)
            .then(res => {
                console.log(res.data)
            })

        this.setState({
            username: ''
        })
        // once you submit a poll, go back to the list of polls
        // window.location = '/'
    }

    render(){
        return (
            <div>
                <h3>Create new user</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label >Username: </label>
                        <input 
                            type="text"
                            required
                            value={this.state.username}
                            onChange={this.handleChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="button submit-button"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateUser