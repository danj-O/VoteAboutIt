import React from "react"
import axios from 'axios'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

class EditPoll extends React.Component {
    state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    

    componentDidMount = () => {
        axios.get('http://localhost:5000/polls/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    description: response.data.description,
                    duration: response.data.duration,
                    date: new Date(response.data.date)
                })
            })
        axios.get('http://localhost:5000/users')
            .then(response => {
                if(response.data.length > 0){
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            })
    }

    handleChangeUsername = (e) => {
        this.setState({
            username: e.target.value,
        })
    }
    handleChangeDescription = (e) => {
        this.setState({
            description: e.target.value,
        })
    }
    handleChangeDuration = (e) => {
        this.setState({
            duration: e.target.value,
        })
    }
    handleChangeDate = (date) => {
        this.setState({
            date: date,
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        const poll = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }
        console.log(poll)
        axios.post('http://localhost:5000/polls/update/' + this.props.match.params.id , poll)
            .then(res => {
                console.log(res.data)
            })

        this.setState({
            username: ''
        })
        // once you submit a poll, go back to the list of polls
        window.location = '/'
    }

    render = () => {
        return (
            <div>
                <h3>Edit Poll</h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value = {this.state.username}
                            onChange= {this.handleChangeUsername}
                        >
                            {
                                this.state.users.map((user) => {
                                    return                                              <option 
                                        key= {user}
                                        value= {user}
                                    > {user} </option>
                                })
                            }

                        </select>
                    </div>
                    <div className="form-group">
                            <label>Description: </label>
                            <input 
                                type="text"
                                required
                                className="form-control"
                                value={this.state.description}
                                onChange={this.handleChangeDescription}
                            />
                    </div>
                    <div className="form-group">
                            <label>Duration: </label>
                            <input 
                                type="text"
                                required
                                className="form-control"
                                value={this.state.duration}
                                onChange={this.handleChangeDuration}
                            />
                    </div>
                    <div className="form-group">
                            <label>Date: </label>
                            <div>
                                <DatePicker 
                                    selected={this.state.date}
                                    onChange={this.state.handleChangeDate}
                                />
                            </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Edit poll" className="button submit-button"/>

                    </div>

                </form>
            </div>
        )
    }
}

export default EditPoll