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
    let { ageMin, ageMax, distance, score, tags } = props
    let { onChange, onChangeAge, onDelete } = fct

    return (
        <React.Fragment>
            <span onClick={() => fct.filter(false)} style={{ position: "absolute", right: "15px", cursor: "pointer", top: "15px" }}>
                <i className="fas fa-times-circle fa-lg"></i>
            </span>
            <SliderAgeRange onChangeAge={onChangeAge} ageMin={ageMin} ageMax={ageMax} />
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
            ageMin: 18,
            ageMax: 25,
            distance: 25,
            score: 0,
            tags: [],
            open: false
        }
        this.fct = {
            onChange: this.onChange.bind(this),
            onChangeAge: this.onChangeAge.bind(this),
            onDelete: this.onDelete.bind(this),
            filter: this.filter.bind(this)
        }
    }
    static contextType = UserProvider;

    componentDidMount = () => {
        this.setState({
            ...this.state, 
            ageMin: this.context.user.ageMin,
            ageMax: this.context.user.ageMax,
            distance: this.context.user.distance,
            identity: this.context.user.identity,
            longitude: this.context.user.longitude,
            latitude: this.context.user.latitude
        })
    }

    onChange = (e) => {
        this.setState({ ...this.state, ...e })
    }

    onChangeAge = (min, max) => {
        this.setState({
            ...this.state,
            ageMin: min,
            ageMax: max
        })
    }

    onDelete = (key) => {
        this.state.tags.splice(key, 1)
        this.setState({ ...this.state, tags: this.state.tags })
    }

    filter = (i) => {
        this.setState({ ...this.state, open: i }, () => {
            this.props.filter(i)
        })
    }

    render() {

        return (
            <div id="search-header" style={{ height: `${this.props.height}` }}>
                {
                    this.state.open === false ?
                        <Button onClick={() => this.filter(true)} name="Filter" /> :
                        <SearchOpen fct={this.fct} props={this.state} getUsers={() => this.props.getUsers(this.state)} />
                }
            </div>
        );
    }
}

export { SearchHeader };