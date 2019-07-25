import React from 'react';
import { Field } from '../export/index'

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
        </div>
    )
}

function ModifyTag({ tagModify, tags, action, fct }) {

    let { onChange, onDelete } = fct
    return (
        <React.Fragment>
            {
                tagModify ? <React.Fragment >

                    <div style={{ display: "flex", padding: "15px 0px" }}>
                        {Object.keys(tags).map((value, id) => {
                            return (<BubbleTag key={id} pos={id} value={tags[value].name} onDelete={onDelete} />)
                        })}
                    </div>
                    <Field icon="fas fa-tag" position="left" style={{ width: "80%" }} placeholder="Add a #tag..." action={action} />
                    <button className="button red-white center" onClick={() => onChange({ tagModify: !tagModify })}>Close</button>
                </React.Fragment>
                    :
                    <button className="button red-white center" onClick={() => onChange({ tagModify: !tagModify })}>
                        <p>Tag</p>
                        <span style={{ padding: "0px 5px" }}>
                            <i className="fas fa-tags"></i>
                        </span>
                    </button>
            }
        </React.Fragment>
    )
}

export { BubbleTag, ModifyTag };