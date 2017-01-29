import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import { listAction } from '../data';

const styles = {

    button: {
        margin: 12
    },

    form: {
        margin: '10px',
        padding: '5px',
    }

};

export default class AutoCompleteExampleSimple extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            inputValue: ''
        }
    }

    addPrimaryText() {

        listAction.addPrimaryText(this.state.inputValue,this.props.menuNames[this.props.selectedMenu]);

    }

    handleUpdateInput(value) {
        this.setState({
            dataSource: [
                value,
                value + value,
                value + value + value,
            ],
            inputValue: value
        });
    };

    render() {
        return (
            <div style={styles.form}>

                <AutoComplete
                    hintText="Write Text"
                    dataSource={this.state.dataSource}
                    onUpdateInput={this.handleUpdateInput.bind(this)}
                    floatingLabelText="Write anything"
                />

                <RaisedButton
                    label={this.props.menuNames[this.props.selectedMenu]}
                    primary={true}
                    style={styles.button}
                    onClick={this.addPrimaryText.bind(this)}
                />

            </div>
        );
    }
}