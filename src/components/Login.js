import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import "../Login.css";
import '../index.css';

const styles = theme => ({
    fab: {
        position: 'fixed',
        bottom: '20px',
        right: '20px'
    },
});

const databaseURL = "https://base-hy-01.firebaseio.com/";

class Login extends React.Component {
    constructor() {
        super();

        this.state = {
            users: {},
            dialog: false,
            id: '',
            pw: ''
        };
    }

    validateForm() {
        return this.state.id.length > 0 && this.state.pw.length > 0;
    }

    _get() {
        fetch(`${databaseURL}/users.json`).where('id','=','park').then(res => {
            if(res.status != 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(users =>{ 

            console.log(users);

            this.setState({users: users})
        });
    }

    _post(user) {
        return fetch(`${databaseURL}/users.json`, {
            method: 'POST',
            body: JSON.stringify(user)
        }).then(res => {
            if(res.status != 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(data => {
            let nextState = this.state.words;
            nextState[data.id] = user;
            this.setState({users: nextState});
        });
    }

    _postNew(user) {
        return fetch(`${databaseURL}/users.json`, {
            method: 'POST',
            body: JSON.stringify(user)
        }).then(res => {
            if(res.status != 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(data => {
            let nextState = this.state.words;

            console.log(data);

            // nextState[data.id] = user;
            // this.setState({users: nextState});
        });
    }

    logIn() {
        this._get();
    }

    handleDialogToggle = () => this.setState({
        dialog: !this.state.dialog
    })

    handleValueChange = (e) => {

        console.log(e.target.value);
        console.log(e.target.name);

        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleSubmit = () => {
        const user = {
            id: this.state.id,
            pw: this.state.pw
        }
        this.handleDialogToggle();
        if (!user.id && !user.pw) {
            return;
        }
        this._post(user);
    }

    regNewUser = () => {
        const user = {
            id: this.state.id,
            pw: this.state.pw
        }
       // this.handleDialogToggle();
        if (!user.id && !user.pw) {
            return;
        }
        this._postNew(user);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="Login">
            <form onSubmit={this.handleSubmit}>
                <FormGroup controlId="id" bsSize="large">
                <ControlLabel>ID</ControlLabel>
                <FormControl
                    autoFocus
                    type="email"
                    name="id"
                    value={this.state.id}
                    onChange={this.handleValueChange}
                />
                </FormGroup>
                <FormGroup controlId="pw" bsSize="large">
                <ControlLabel>Password</ControlLabel>
                <FormControl
                    value={this.state.pw}
                    name="pw"
                    onChange={this.handleValueChange}
                    type="password"
                />
                </FormGroup>
                <Button block bsSize="large" disabled={!this.validateForm()}  onClick={this.logIn} >
                Sign In
                </Button>
                
            </form>

            <Button block bsSize="large" onClick={this.handleDialogToggle}>
                Sign Up
            </Button>
            <Dialog open={this.state.dialog} onClose={this.handleDialogToggle}>
                <DialogTitle>사용자 등록</DialogTitle>
                <DialogContent>
                    <TextField label="ID" type="text" name="id" value={this.state.id} onChange={this.handleValueChange}/><br/>
                    <TextField label="PASSWORD" type="text" name="pw" value={this.state.pw} onChange={this.handleValueChange}/><br/>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={this.regNewUser}>추가</Button>
                    <Button variant="outlined" color="primary" onClick={this.handleDialogToggle}>닫기</Button>
                </DialogActions>
            </Dialog>

            </div>
        );
    }
}

export default Login;