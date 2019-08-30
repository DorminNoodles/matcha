import React from 'react';
import { getLocation } from "../function/get"
import Autosuggest from 'react-autosuggest';
import UserProvider from '../context/UserProvider';

const getSuggestionValue = suggestion => suggestion.place_name ? suggestion.place_name : "";

const renderSuggestion = suggestion => (
    <div className="white-red">{suggestion.place_name}</div>
);

class Location extends React.Component {
    constructor() {
        super();
        this.state = {
            value: '',
            suggestions: [],
            city: "",
            error: ""
        };
    }

    static contextType = UserProvider;


    onChange = (e, { newValue }) => {
        this.setState({ value: newValue });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        getLocation(this.context.user.token, value).then((res) => {
            if (typeof res === "object")
                this.setState({ suggestions: res });
            else
                this.setState({ suggestions: [] });
        })
    };

    onSuggestionsClearRequested = (e) => {
        this.setState({ suggestions: [] });
    };

    handleKeyDown = (e) => {
        let { onChange, tags } = this.props
        if ((e.key === "Enter" || e.type === "click") && this.state.value.length > 0) {
            getLocation(this.context.user.token, this.state.value).then((res) => {
                res.map((e) => {
                    if (e.place_name === this.state.value) {
                        this.setState({ ...this.state, city: e });
                        onChange({ location: e.text })
                    }
                })
            })
        }
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
            <div>

                <p className="error center">{this.state.error}</p>
                <div style={{ justifyContent: "space-between", display: "flex" }}>
                    <p>City</p>
                    <p>{this.state.city.text}</p>
                </div>

                <div style={{ margin: "20px auto", alignItems: "flex-start", display: "flex", justifyContent: "center" }}>
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
            </div >
        );
    }
}

export { Location };