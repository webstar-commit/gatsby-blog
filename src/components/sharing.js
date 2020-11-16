import React from 'react'
import { FaTwitter, FaRegEnvelope } from 'react-icons/fa'
import { graphql, useStaticQuery } from 'gatsby'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { ExternalLink, ListInline } from '@browniebroke/react-ui-components'

const SharingStyles = styled.div`
  margin: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Sharing = ({ post, path }) => {
  const {
    site: {
      siteMetadata: { siteUrl, social },
    },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteUrl
          social {
            twitter
          }
        }
      }
    }
  `)

  // Twitter sharing
  const hashtags = post.frontmatter.tags.filter((tag) => !tag.includes(' '))
  const twitterParams = new URLSearchParams({
    text: `${post.frontmatter.title} by Bruno Alla`,
    url: `${siteUrl}${path}`,
    via: social.twitter,
    hashtags: hashtags.join(','),
  }).toString()
  const twitterUrl = `https://twitter.com/intent/tweet/?${twitterParams}`

  // email sharing
  const mailtoParams = new URLSearchParams({
    subject: `${post.frontmatter.title} by Bruno Alla`,
    body: `${siteUrl}${path}`,
  }).toString()
  const emailUrl = `mailto:?${mailtoParams}`

  return (
    <SharingStyles>
      <h4>Liked it? Please share it!</h4>
      <ListInline>
        <ExternalLink to={emailUrl} title="Share via email">
          <FaRegEnvelope />
        </ExternalLink>
        <ExternalLink to={twitterUrl} title="Share on Twitter">
          <FaTwitter />
        </ExternalLink>
      </ListInline>
    </SharingStyles>
  )
}

Sharing.propTypes = {
  post: PropTypes.shape({
    frontmatter: PropTypes.shape({
      title: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
  path: PropTypes.string.isRequired,
}

export default Sharing
