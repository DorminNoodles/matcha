import React from 'react';
import { SliderLocation, SliderAgeRange } from "../export"
import { getTags } from "../function/get"
import Autosuggest from 'react-autosuggest';
import UserProvider from '../context/UserProvider';

const getSuggestionValue = suggestion => suggestion.value ? suggestion.value : "";

const renderSuggestion = suggestion => (
    <div style={{ borderBottom: "1px solid", width: "240px" }}>
        {suggestion.value}
    </div>
);

class Tags extends React.Component {
    constructor() {
        super();
        this.state = {
            value: '',
            suggestions: []
        };
    }
    static contextType = UserProvider;

    onChange = (e, { newValue }) => {
        this.setState({ value: newValue });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        getTags(this.context.user.token, value).then((res) => {
            this.setState({ suggestions: res });
        })
    };

    onSuggestionsClearRequested = (e) => {
        this.setState({ suggestions: [] });
    };

    handleKeyDown = (e) => {
        if (e.key === "Enter" || e.type === "click")
            console.log("tada")
    }

    render() {
        const { value, suggestions } = this.state;

        const inputProps = {
            placeholder: 'Looking for #tag',
            value,
            onChange: this.onChange,
            onKeyDown: this.handleKeyDown
        };

        return (
            <div className="center" style={{ margin: "20px auto", alignItems:"flex-start"}}>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                />
                <button className="button" style={{ height: "30px", fontSize: "small" }} onClick={this.handleKeyDown}>OK</button>
            </div>
        );
    }
}

class SearchHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            age_min: 18,
            age_max: 25,
            distance: 25,
            tags: []
        }
        this.onChange = this.onChange.bind(this)
    }
    onChange = (e) => {
        this.setState({ ...this.state, ...e }, () => { })
    }

    onChangeAge = (min, max) => {

        this.setState({
            ...this.state,
            info: {
                ...this.state.info,
                age_min: { value: min, error: "" },
                age_max: { value: max, error: "" }
            }
        })
    }

    render() {
        return (
            <div id="search-header">
                <SliderAgeRange onChangeAge={this.onChangeAge} age_min={this.state.age_min} age_max={this.state.age_max} />
                <SliderLocation onChange={this.onChange} distance={this.state.distance} />
                <SliderLocation onChange={this.onChange} distance={this.state.distance} />
                <Tags />
            </div>
        );
    }
}

export { SearchHeader };