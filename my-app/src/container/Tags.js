import React from "react"
import { addTag } from '../function/post'
import UserProvider from '../context/UserProvider';
import { ModifyTag } from '../export/index'

class Tags extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tagModify: false,
            tags: [
                { id: 1, name: "Apples" },
                { id: 2, name: "Pears" }
            ]
        }
        this.function = {
            handleKeyDown: this.handleKeyDown.bind(this),
            onDelete: this.onDelete.bind(this),
            onChange: this.onChange.bind(this),
        }

    }
    static contextType = UserProvider;

    onDelete(key) {
        console.log(this.state.tags.slice(key, key + 1))
    }

    handleKeyDown(props) {
        if (props.keyCode === 13)
            addTag(props.target.value,this.context.user.token)
    }

    onChange(value) {
        this.setState({ ...this.state, ...value })
    }

    render() {
        let action = { onKeyDown: this.function.handleKeyDown }

        return (
            <React.Fragment>
                {
                    <p style={{ fontStyle: "italic", fontWeight: "700" }}>
                        #fille #sushi #pasteque #argent
                    </p>
                }
                {
                    this.props.id > 0 ? <React.Fragment />
                        : <ModifyTag {...this.state} action={action} fct={this.function} />
                }
            </React.Fragment>
        )
    }
};

export default Tags;
