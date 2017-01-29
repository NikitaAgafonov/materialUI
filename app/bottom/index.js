import React from 'react';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import {data, listAction} from '../data';

class Bottom extends React.Component {

    constructor(props) {
        super(props);
        this.state = data.getAllData();
    }

    componentDidMount() {

        data.addChangeListener(this._setFluxState.bind(this));

    }

    _setFluxState() {

        this.setState(data.getAllData());

    }

    componentWillUnmount() {

        data.removeChangeListener(this._setFluxState.bind(this));

    }

    select(num) {

        listAction.selectMenu(num);

    }

    render () {

        return (
            <Paper zDepth={1}>
                <BottomNavigation selectedIndex={this.state.selectedMenu}>
                    <BottomNavigationItem
                        label="Primary"
                        icon={<RemoveRedEye />}
                        onTouchTap={() => this.select(0)}
                    />
                    <BottomNavigationItem
                        label="Trash"
                        icon={<RemoveRedEye />}
                        onTouchTap={() => this.select(1)}
                    />
                    <BottomNavigationItem
                        label="Spam"
                        icon={<RemoveRedEye />}
                        onTouchTap={() => this.select(2)}
                    />
                </BottomNavigation>
            </Paper>
        );
    }
}

export default Bottom;