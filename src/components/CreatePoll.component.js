import React from "react"
import axios from 'axios'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

class CreatePoll extends React.Component {
    state = {
            username: '',
            description: '',
            voterCount: 0,
            options: [],
            date: new Date(),
            users: []
        }
    

    componentDidMount = () => {
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
    handleChangeVoterCount = (e) => {
        this.setState({
            voterCount: e.target.value,
        })
    }
    handleChangeDate = (date) => {
        this.setState({
            date: date,
        })
    }
    handleChangeOption = (e) => {
        this.setState({
            options: e.target.value, 
        })
    }

    handleClick = (e) => {
        console.log(e.target)
        // this.setState({options: e.t})

    }

    onSubmit = (e) => {
        e.preventDefault()
        const poll = {
            username: this.state.username,
            description: this.state.description,
            options: this.state.options.name, 
            voterCount: this.state.voterCount,
            date: this.state.date
        }
        console.log(poll)
        axios.post('http://localhost:5000/polls/add', poll)
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
                <h3>Create new Poll!</h3>
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
                                    return                                      <option 
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
                            <label>Voter-Count: </label>
                            <input 
                                type="text"
                                required
                                className="form-control"
                                value={this.state.duration}
                                onChange={this.handleChangeVoterCount}
                            />
                    </div>
                    <div className="form-group">
                            <label>Type an option and click 'add' to add more: </label>
                            <input 
                                type="text"
                                required
                                className="optionField form-control"
                                value={this.state.options}
                                onChange={this.handleChangeOption}

                            />
                            <button onClick={this.handleClick} > Add</button>
                            <br/>{this.state.options}
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
                        <input type="submit" value="Create new poll" className="button submit-button"/>

                    </div>

                </form>
            </div>
        )
    }
}

export default CreatePoll