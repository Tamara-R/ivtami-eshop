import React, { useState } from 'react';


const Search = ({ history }) => {

    
    const [ keyword, setKeyword ] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        if (keyword.trim()) {
            history.push(`/search/${keyword}`);
            setKeyword('');
        } else {
            history.push('/');
        }
    }

    return (

        <form onSubmit={handleSubmit} autoComplete='off'>
            <div className="input-group">
                <input
                    type="text"
                    id="search_field"
                    className="form-control"
                    placeholder="Search"
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                />
                <div className="input-group-append">
                    <button type='submit' id="search_btn" className="btn">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </form>
    )
}

export default Search;