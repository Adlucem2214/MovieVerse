# MovieVerse

Movieverse is a web application designed to help users discover and explore movies. It provides movie recommendations, details, and trailers, all in one place. The project leverages the, The Movie Database (TMDB) API to fetch movie data, including top-rated and popular movies, as well as trailers and details.

# How to run the Project 

Add the API token inside config.js file 
Then run the landing.html file and click on get started which redirects to Home page 
The home Page contains a list of top-rated and popular movies clicking will show details of the selected movies
The movie link on the Home page will direct to a list of Trending, Top rated, Popular, and Upcoming movies 
click any of the listed movies inside the Home page and the Movies Page will direct you to movie details and trailer video (details and movie trailer are shown if available)
Pagination is implemented inside the Movies Page using Previous and Next 
Search functionality also works on all pages search using movie title results will appear in a list and click on results to see details of the selected movie 

#Features 
 1. Responsive Design
The website is fully responsive and works seamlessly on mobile, tablet, and desktop devices.

 2. Search Functionality
Users can search for movies using the search bar. Results are displayed in real-time as the user types.

3. Movie Details and Trailers
 Users can click on a movie card to view its details and watch its trailer(if available ).
4. Pagination 
Pagination is implemented inside the Movies Page using Previous and Next

#How to get API Token

1. signup at https://www.themoviedb.org/signup 
2. Verify the email before logging in, after verifying login using credentials 
3. Inside profile under settings go to API
4. Choose the Developer option 
5. Go through the terms and conditions 
6. Select Desktop Application and fill in all the info  required 
7. Use the generated API token and use it inside config.js

#API Endpoints Used
Top-Rated Movies:
https://api.themoviedb.org/3/movie/top_rated

Popular Movies:
https://api.themoviedb.org/3/movie/popular

Movie Details:
https://api.themoviedb.org/3/movie/{movie_id}

Movie Trailers:
https://api.themoviedb.org/3/movie/{movie_id}/videos

Search Movies:
https://api.themoviedb.org/3/search/movie
