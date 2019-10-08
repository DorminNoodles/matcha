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
            suggestions: [],
            error: ""
        };
    }

    static contextType = UserProvider;

    UNSAFE_componentWillReceiveProps(next) {
        if (this.state.error !== "" && next.tags.length < 10)
            this.setState({ error: "" });
    }

    onChange = (e, { newValue }) => {
        this.setState({ value: newValue });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        getTags(this.context.user.token, value).then((res) => {
            console.log(res)
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
            if (this.props.tags.length === 10)
                this.setState({ error: "10 tags maximum!" });
            else {
                tags.push(this.state.value)
                this.setState({ value: "" }, () => {
                    onChange({ tags })
                });
            }
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
            <React.Fragment>
                <p className="error center">{this.state.error}</p>
                <div style={{ margin: "20px auto", alignItems: "flex-start", display: "flex", justifyContent: "center", width: "80%", maxWidth: "240px" }}>
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
            </React.Fragment>
        );
    }
}

export { TagsSuggest };