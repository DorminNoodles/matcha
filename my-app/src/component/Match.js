import React from 'react';
import { SliderOne, SliderAgeRange, BubbleTag, TagsSuggest } from "../export"
import UserProvider from '../context/UserProvider';


const listTags = (tags, onDelete) => {

    return (
        <div className="center" style={{ padding: "15px 0px", flexWrap: "wrap" }}>
            {Object.keys(tags).map((value, id) => {
                return (<BubbleTag key={id} pos={id} value={tags[value]} onDelete={onDelete} />)
            })}
        </div>
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
            tags: []
        }
        this.onChange = this.onChange.bind(this)
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

        let { age_min, age_max, distance, score, tags } = this.state

        return (
            <div id="search-header">
                <SliderAgeRange onChangeAge={this.onChangeAge} age_min={age_min} age_max={age_max} />
                <SliderOne onChange={this.onChange} val={distance} i="Distance" unite="km" />
                <SliderOne onChange={this.onChange} val={score} i="Score" unite="points" />
                {listTags(this.state.tags, this.onDelete)}
                <TagsSuggest onChange={this.onChange} tags={this.state.tags} />
                <button className="button white-red">
                    Search
                    <span style={{ marginLeft: "5px" }}>
                        <i className="fas fa-search"></i>
                    </span>
                </button>
            </div>
        );
    }
}

export { SearchHeader };