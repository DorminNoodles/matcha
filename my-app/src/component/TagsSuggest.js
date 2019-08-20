import React from 'react';
import { getTags } from "../function/get"
import Autosuggest from 'react-autosuggest';
import UserProvider from '../context/UserProvider';

const getSuggestionValue = suggestion => suggestion.value ? suggestion.value : "";

const renderSuggestion = suggestion => (
    <div>{suggestion.value}</div>
);

class TagsSuggest extends React.Component {
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
        let { onChange, tags } = this.props
        if (e.key === "Enter" || e.type === "click") {
            tags.push(this.state.value)
            this.setState({ value: "" }, () => {
                onChange({ tags })
            });
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

                <div className="center" style={{ margin: "20px auto", alignItems: "flex-start" }}>
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
            </div>
        );
    }
}

export { TagsSuggest };