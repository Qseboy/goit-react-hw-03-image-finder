import { Component } from 'react';
import {
  SearchbarButton,
  SearchbarForm,
  SearchbarHeader,
  SearchbarInput,
  SearchbarSpan,
} from './searchbar.styled';
import PropTypes from 'prop-types';

export default class Searchbar extends Component {
  state = {
    searchValue: '',
  };

  handleInput = event => {
    this.setState({ searchValue: event.target.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.searchValue.trim() === '') {
      alert('Input name of pictures');
      return;
    }

    this.props.submitForm(this.state.searchValue);
    this.setState({ searchValue: '' });
  };

  render() {
    return (
      <>
        <SearchbarHeader>
          <SearchbarForm onSubmit={this.handleSubmit}>
            <SearchbarButton type="submit">
              <SearchbarSpan>Search</SearchbarSpan>
            </SearchbarButton>
            <SearchbarInput
              className="input"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={this.state.searchValue}
              onChange={this.handleInput}
            ></SearchbarInput>
          </SearchbarForm>
        </SearchbarHeader>
      </>
    );
  }
}

Searchbar.propTypes = {
  submitForm: PropTypes.func.isRequired,
};
