import React from 'react';
import { SliderLocation, SliderAgeRange } from "../export"
import Autosuggest from 'react-autosuggest';

const tags = [
    { name: 'C' },
    { name: 'Elm' },
    { name: 'clm' }
];

const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : tags.filter(lang =>
        lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
};

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
    <div> {suggestion.name}</div>
);


class Tags extends React.Component {
    constructor() {
        super();
        this.state = {
            value: '',
            suggestions: []
        };
    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({ suggestions: getSuggestions(value) });
    };

    onSuggestionsClearRequested = () => {
        this.setState({ suggestions: [] });
    };

    render() {
        const { value, suggestions } = this.state;

        const inputProps = {
            placeholder: 'Looking for #tag',
            value,
            onChange: this.onChange
        };

        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
            />
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