export const navLinksArray = [
  {
    linkName: "/categories/movies/popular",
    linkNamePaginated: `/categories/movies/popular/:page=1`,
    linkNameHtml: "Popular Movies",
    url: `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`,
  },
  {
    linkName: "/categories/tv/popular",
    linkNamePaginated: `/categories/tv/popular/:page=1`,
    linkNameHtml: "Popular Tv Shows",
    url: `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`,
  },
  {
    linkName: "/categories/tv/trending",
    linkNamePaginated: `/categories/tv/trending/:page=1`,
    linkNameHtml: "Trending",
    url: `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`,
  },
  {
    linkName: "/categories/coming-soon",
    linkNamePaginated: `/categories/coming-soon/:page=1`,
    linkNameHtml: "Coming Soon",
    url: `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`,
  },
]
