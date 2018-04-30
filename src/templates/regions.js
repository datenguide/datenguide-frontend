import React from 'react'

import Header from '../components/Header'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import StateList from '../components/StateList'

const prepareData = ({ regions, stateNames }) => {
  const districts = regions.edges
    .filter(({ node }) => node.slug !== node.state.slug)
    .map(({ node }) => node)

  const states = regions.edges
    .filter(({ node }) => node.slug === node.state.slug)
    .map(({ node }) => node)
    .reduce((map, state) => ((map[state.slug] = state), map), {})

  return stateNames.distinct.map(stateSlug => ({
    ...states[stateSlug],
    districts: districts.filter(({ state }) => stateSlug === state.slug)
  }))
}

export default ({ data }) => (
  <div>
    <Header />

    <Hero
      title={data.page.frontmatter.title}
      intro={data.page.frontmatter.intro}
    />

    {prepareData(data).map(state => <StateList state={state} />)}

    <Footer />
  </div>
)

export const query = graphql`
  query regionsOverview($slug: String!) {
    page: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        intro
      }
    }
    stateNames: allRegion(filter: { slug: { ne: "deutschland" } }) {
      distinct(field: state___slug)
    }
    regions: allRegion(
      filter: { slug: { ne: null } }
      sort: { fields: [slug], order: ASC }
    ) {
      edges {
        node {
          id
          slug
          name
          name_ext
          state {
            slug
          }
        }
      }
    }
  }
`