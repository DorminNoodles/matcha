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
            tags: [],
            value: ""
        }
        this.function = {
            handleKeyDown: this.handleKeyDown.bind(this),
            onDelete: this.onDelete.bind(this),
            onChange: this.onChange.bind(this),
        }

    }
    static contextType = UserProvider;

    componentDidMount() { this.getUserTags() }

    getUserTags() {
        let id = this.props.id > 0 ? this.props.id : this.context.user.id

        getUserTags(this.context.user.token, id).then((res) => {
            if (res.data && res.data.data)
                this.setState({ ...this.state, tags: res.data.data })
        })
    }

    onDelete(key) {
        let { token, id } = this.context.user
        deleteTag(token, this.state.tags.slice(key, key + 1), id).then((res) => {
            if (res.status === "success") {
                this.state.tags.splice(key, 1)
                this.setState({ ...this.state, tags: this.state.tags })
            }
        })
    }

    handleKeyDown(props) {
        if (props.keyCode === 13 && this.state.value.length > 0) {

            if (this.state.tags.length < 10)
                addTag(props.target.value, this.context.user.token).then((res) => {
                    if (res.status === "success") {
                        this.getUserTags()
                        this.setState({ ...this.state, value: "", error: "" })
                    }
                })
            else if (this.state.tags.length >= 10)
                this.setState({ error: "10 tags maximum!" });
        }
        else { this.setState({ error: "" }); }
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
        let action = { onKeyDown: this.function.handleKeyDown, onChange: (e) => { this.onChange({ value: e.target.value }) } }

        return (
            <React.Fragment>
                <p style={{ fontStyle: "italic", fontWeight: "700" }}>
                    {this.listTags()}
                </p>
                {
                    this.props.id > 0 ? <React.Fragment />
                        : <ModifyTag {...this.state} value={this.state.value} action={action} fct={this.function} />
                }
            </React.Fragment>
        )
    }
};

export default Tags;
