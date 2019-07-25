import React from 'react';
import { Field } from '../export/index'
import { addTag } from '../function/post'
import UserProvider from '../context/UserProvider';

function BubbleTag({ value, onDelete, pos }) {
    return (
        <div style={{
            border: "1px solid",
            borderRadius: "5px",
            padding: "4px",
            marginRight: "15px"
        }}>
            {value}
            <span style={{ padding: "0px 5px" }} onClick={() => onDelete(pos)}>
                <i className="fas fa-times" />
            </span>
        </div >
    )
}

class Tags extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: [
                { id: 1, name: "Apples" },
                { id: 2, name: "Pears" }
            ]
        }
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.onDelete = this.onDelete.bind(this)
    }
    static contextType = UserProvider;

    onDelete(key) {
        console.log(this.state.tags.slice(key, key + 1))
    }

    handleKeyDown(props) {
        if (props.keyCode === 13)
            addTag(props.target.value, this.context.user.id, this.context.user.token)
    }

    render() {
        const { tags } = this.state;
        let action = { onKeyDown: this.handleKeyDown }

        return (
            <React.Fragment>

                <div style={{ display: "flex", padding: "15px 0px" }}>
                    {Object.keys(tags).map((value, id) => {
                        return (<BubbleTag key={id} pos={id} value={tags[value].name} onDelete={this.onDelete} />)
                    })}
                </div>


                <Field icon="fas fa-tag" position="left" style={{ width: "80%" }} placeholder="Add a #tag..." action={action} />
                <button className="button red-white center">Close</button>
            </React.Fragment>
        )
    }
};


export { Tags, BubbleTag };