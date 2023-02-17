import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getMovies } from '../services/fakeMovieService.js';
import Pagination from './common/pagination.jsx';
import { paginate } from '../utils/paginate.js';
import ListGroup from './common/listGroup.jsx';
import { getGenres } from '../services/fakeGenreService.js';
import MoviesTable from './moviesTable.jsx';
import SearchBox from './searchBox.jsx';
import _ from 'lodash';


class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        searchQuery: "",
        selectedGenere: null,
        sortColumn: { path: 'title', order: 'asc' }
    }

    componentDidMount() {
        const genres = [{ _id: '', name: 'All genres' }, ...getGenres()]
        this.setState({ movies: getMovies(), genres })
    }

    handleDelete = (movie) => {
        const movies = this.state.movies.filter(item => item._id !== movie._id)
        this.setState({ movies })

    }

    handleLiked = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies })
    }

    handlePageChange = (page) => {
        this.setState({ currentPage: page })
    }

    handleGenreSelect = genre => {
        this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 })
    }

    handleSearch = query => {
        this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 })
    }

    handleSort = sortColumn => {

        this.setState({ sortColumn })
    }



    getPagedData = () => {
        const { pageSize, currentPage, movies: allMovies, selectedGenre, sortColumn, searchQuery } = this.state;

        let filtered = allMovies;

        if (searchQuery)
            filtered = allMovies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
        else if (selectedGenre && selectedGenre._id)
            filtered = allMovies.filter(m => m.genre._id === selectedGenre._id)

        // const filteredMovies = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

        const movies = paginate(sorted, currentPage, pageSize)

        return { totalCount: filtered.length, data: movies }
    }


    render() {
        const { length: count } = this.state.movies
        const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
        const { totalCount, data: movies } = this.getPagedData();

        return (
            <div className='row'>
                <div className="col-3">
                    <ListGroup items={this.state.genres} onItemSelect={this.handleGenreSelect} selectedItem={this.state.selectedGenre} />
                </div>
                <div className="col">
                    <Link to="/movies/new" className='btn btn-primary' style={{ marginBottom: 20 }}>New Movie</Link>

                    {count !== 0 ?
                        <div><p>Showing {totalCount} movies in the database</p>
                            <SearchBox value={searchQuery} onChange={this.handleSearch} />
                            <MoviesTable onDelete={this.handleDelete} onLike={this.handleLiked} movies={movies} onSort={this.handleSort} sortColumn={sortColumn} />
                        </div> : <div>There are no movies in the database.</div>
                    }
                    <Pagination itemsCount={totalCount} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />
                </div>

            </div>

        );
    }
}

export default Movies;