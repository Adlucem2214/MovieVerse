# MovieVerse

 Movieverse is a web application designed to help users discover and explore movies.It provides movie recommendations, details, and trailers, all in one place. The project leverages the The Movie Database (TMDB) API to fetch movie data, including top-rated and popular movies, as well as trailers and details.

# How to run the Project 

Inclide the API token inside config.js file 
Then run the landing.html file and click on get started which redirects to Home page 
Home Page contains list of top rated and popular movies clicking will show detils of the selected movies
Movie link in the Home page will direct to list of Trending , Top rated , Popular and Upcoming movies 
click any of the listed movies inside Home page and Movies Page will direct to movie details and trailer video (details and movie trailer are shown if available)
Pagination is implemented inside Movies Page using previous and Next 
Search functionality also works in all pages search using movie title results will appear in a list and click on results to see details of the selected movie 

 Features 
 1. Responsive Design
The website is fully responsive and works seamlessly on mobile, tablet, and desktop devices.

 2. Search Functionality
Users can search for movies using the search bar. Results are displayed in real-time as the user types.

3. Movie Details and Trailers
 Users can click on a movie card to view its details and watch its trailer(if available ).
4. Pagination 
Pagination is implemented inside Movies Page using Previous and Next
How to get API Token 
Step 1 signup at https://www.themoviedb.org/signup 
Step 2 Verfify the email before logging in , after verfifying login using credentials 
Step 3 inside profile under setting go to API
Step 4 Choose Developer option 
Step 5 Go through the terms and conditions 
Step 6 Select Desktop Application and fill all the info  required 
Step 7 Use the generated API token and use it inside config.js

API Endpoints Used
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
