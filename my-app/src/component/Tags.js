import React from 'react';
import { Field } from '../export/index'

function BubbleTag({ value, onDelete, pos }) {
    return (
        <div style={{
            height: "fit-content",
            border: "1px solid",
            borderRadius: "5px",
            padding: "4px",
            margin: "0px 15px 10px 0px"
        }}>
            {value}
            <span style={{ padding: "0px 5px" }} onClick={() => onDelete(pos)}>
                <i className="fas fa-times" />
            </span>
        </div>
    )
}

function ModifyTag({ tagModify, tags, action, fct, value }) {

    let { onChange, onDelete } = fct
    return (
        <React.Fragment>
            {
                tagModify ? <React.Fragment >

                    <div style={{ display: "flex", padding: "15px 0px", flexWrap: "wrap" }}>
                        {Object.keys(tags).map((value, id) => {
                            return (<BubbleTag key={id} pos={id} value={tags[value].tag} onDelete={onDelete} />)
                        })}
                    </div>
                    <Field icon="fas fa-tag" position="left"  value={value} style={{ width: "80%" }} placeholder="Add a #tag..." action={action} />
                    <button className="button red-white center" onClick={() => onChange({ tagModify: !tagModify })}>Close</button>
                </React.Fragment>
                    :
                    <button className="button red-white center" onClick={() => onChange({ tagModify: !tagModify })} style={{ margin: "15px 0px" }}>
                        <p>Tags</p>
                        <span style={{ padding: "0px 5px" }}>
                            <i className="fas fa-tags"></i>
                        </span>
                    </button>
            }
        </React.Fragment>
    )
}

export { BubbleTag, ModifyTag };