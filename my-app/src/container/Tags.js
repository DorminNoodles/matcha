import React from "react"
import { addTag } from '../function/post'
import UserProvider from '../context/UserProvider';
import { ModifyTag } from '../export/index'
import { getUserTags } from '../function/get'
import { deleteTag } from '../function/delete'

class Tags extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tagModify: false,
            tags: []
        }
        this.function = {
            handleKeyDown: this.handleKeyDown.bind(this),
            onDelete: this.onDelete.bind(this),
            onChange: this.onChange.bind(this),
        }

    }
    static contextType = UserProvider;

    componentDidMount() {
        let id = this.props.id > 0 ? this.props.id : this.context.user.id
        getUserTags(this.context.user.token, id).then((res) => {
            this.setState({ ...this.state, tags: res.data.data })
        })
    }

    onDelete(key) {
        let { token, id } = this.context.user
        deleteTag(token, this.state.tags.slice(key, key + 1), id)
    }

    handleKeyDown(props) {
        if (props.keyCode === 13)
            addTag(props.target.value, this.context.user.token)
    }

    onChange(value) { this.setState({ ...this.state, ...value }) }

    listTags() {
        let tags = this.state.tags
        let list = ""
        for (var i in tags)
            list += " #" + tags[i].tag
        return list
    }

    render() {
        let action = { onKeyDown: this.function.handleKeyDown }

        return (
            <React.Fragment>
                {
                    <p style={{ fontStyle: "italic", fontWeight: "700" }}>
                        {this.listTags()}
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
