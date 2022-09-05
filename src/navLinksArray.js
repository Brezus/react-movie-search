import { nanoid } from "nanoid"
import { SearchPage } from "./composition/SearchPage"
import { Route } from "react-router-dom"

export const LinksArray = [
  {
    linkName: "/categories/movies/popular",
    linkNamePaginated: `/categories/movies/popular/:page=1`,
    linkNameHtml: "Popular Movies",
    url: `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&`,
  },
  {
    linkName: "/categories/tv/popular",
    linkNamePaginated: `/categories/tv/popular/:page=1`,
    linkNameHtml: "Popular Tv Shows",
    url: `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&`,
  },
  {
    linkName: "/categories/tv/trending",
    linkNamePaginated: `/categories/tv/trending/:page=1`,
    linkNameHtml: "Trending",
    url: `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&`,
  },
  {
    linkName: "/categories/coming/soon",
    linkNamePaginated: `/categories/coming/-soon/:page=1`,
    linkNameHtml: "Coming Soon",
    url: `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&`,
  },
]

export const navRoutesHtml = LinksArray.map((link) => {
  return (
    <Route path={[`${link.linkName}/page=:pNum`, link.linkName]} key={nanoid()}>
      <SearchPage
        url={link.url}
        redirected={false}
        category={true}
        linkName={link.linkName}
      >
        <p>categories : {link.linkNameHtml}</p>
      </SearchPage>
    </Route>
  )
})
