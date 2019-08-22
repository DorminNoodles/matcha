import React from 'react';
import { SliderOne, SliderAgeRange, BubbleTag, TagsSuggest } from "../export"
import UserProvider from '../context/UserProvider';

const listTags = (tags, onDelete) => {

    return (
        <div style={{ padding: "15px 0px", flexWrap: "wrap", display: "flex", justifyContent: "center" }}>
            {Object.keys(tags).map((value, id) => {
                return (<BubbleTag key={id} pos={id} value={tags[value]} onDelete={onDelete} />)
            })}
        </div>
    )
}

const Button = ({ onClick, name, getUsers }) => (
    <button className="button white-red" onClick={onClick}>
        <p>{name}</p>
        <span style={{ marginLeft: "5px" }}>
            <i className="fas fa-search"></i>
        </span>
    </button>
)

const SearchOpen = ({ fct, props, getUsers }) => {
    let { age_min, age_max, distance, score, tags } = props
    let { onChange, onChangeAge, onDelete } = fct

    return (
        <React.Fragment>
            <span onClick={() => onChange({ open: false })} style={{ position: "absolute", right: "15px", cursor: "pointer" }}>
                <i className="fas fa-times-circle fa-lg"></i>
            </span>
            <SliderAgeRange onChangeAge={onChangeAge} age_min={age_min} age_max={age_max} />
            <SliderOne onChange={onChange} val={distance} i="Distance" unite="km" />
            <SliderOne onChange={onChange} val={score} i="Score" unite="points" />
            {listTags(tags, onDelete)}
            <TagsSuggest onChange={onChange} tags={tags} />
            <Button name="Search" onClick={getUsers} />
        </React.Fragment>
    )
}

class SearchHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            age_min: 18,
            age_max: 25,
            distance: 25,
            score: 25,
            tags: [],
            open: false
        }
        this.fct = {
            onChange: this.onChange.bind(this),
            onChangeAge: this.onChangeAge.bind(this),
            onDelete: this.onDelete.bind(this)
        }
    }
    static contextType = UserProvider;

    onChange = (e) => {
        this.setState({ ...this.state, ...e })
    }

    onChangeAge = (min, max) => {
        this.setState({
            ...this.state,
            age_min: min,
            age_max: max
        })
    }

    onDelete = (key) => {
        this.state.tags.splice(key, 1)
        this.setState({ ...this.state, tags: this.state.tags })
    }

    render() {

        return (
            <div id="search-header">
                {
                    this.state.open === false ?
                        <Button onClick={() => this.fct.onChange({ open: true })} name="Filter" /> :
                        <SearchOpen fct={this.fct} props={this.state} getUsers={() => this.props.getUsers(this.state)} />
                }
            </div>
        );
    }
}

export { SearchHeader };