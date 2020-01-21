import React from "react"
import axios from 'axios'
import { Link } from 'react-router-dom'


const Poll = props => {
    return (
    <tr>
        <td>{props.poll.username}</td>
        <td>{props.poll.description}</td>
        <td>{props.poll.voterCount}</td>
        <td>{props.poll.options.name}</td>
        <td>{props.poll.options.count}</td>
        <td>{props.poll.date.substring(0.10)}</td>
        <td>
            <Link to={"/edit/"+props.poll._id}>edit</Link> | 
            <button onClick={()=> props.deletePoll(props.poll._id)}>delete</button>
        </td>
    </tr>
    )}


class PollsList extends React.Component {
    state = {
        polls: []
    }
    render(){
        return (
            <h1>you are in polls list </h1>
        )
    }

    componentDidMount(){
        axios.get('http://localhost:5000/polls/')
            .then(response => {
                this.setState({polls: response.data})
            })
            .catch(error => {
                console.log(error)
            })
    }
    deletePoll = id => {
        axios.delete('http://localhost:5000/polls/' + id)
            .then(res => console.log(res.data))
        this.setState({
            polls: this.state.polls.filter(el => el._id !== id)
        })
    }
    pollList = () => {
        return this.state.polls.map(currentpole => {
            return <Poll 
                        poll={currentpole} 
                        deletePoll={this.deletePoll}
                        key={currentpole._id}
                        options={currentpole.options}
                    />
        })
    }

    render = () => {

        return(
            <div>
                <h3>Polls</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Voter-Count</th>
                            <th>Options</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.pollList()}
                    </tbody>
                </table>
            </div>
        )
    }


}

export default PollsList