import React from 'react'
import GatsbyLink from 'gatsby-link'
import { Grid, GridCell } from 'rmwc/Grid'
import GithubCircleIcon from 'mdi-react/GithubCircleIcon'

import '../scss/components/_footer.scss'

export default function AppFooter(props) {
  return (
    <footer className="footer">
      <Grid>
        <GridCell span="7">
          <a
            className="footer__link footer__link--github"
            href="http://github.com/datenguide"
          >
            <GithubCircleIcon />
            Datenguide ist open source
          </a>
        </GridCell>
        <GridCell span="5">
          <GatsbyLink
            className="footer__link footer__link--contact"
            to="/contact"
          >
            Kontakt und Impressum
          </GatsbyLink>
          <GatsbyLink
            className="footer__link footer__link--privacy"
            to="/privacy"
          >
            Datenschutz
          </GatsbyLink>
        </GridCell>
      </Grid>
    </footer>
  )
}
