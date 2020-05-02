import React from 'react'
import { graphql } from 'gatsby'
import slugify from 'slugify'
import { DiscussionEmbed } from 'disqus-react'

import Layout from '../components/layout'
import Pagination from '../components/pagination'
import SEO from '../components/seo'
import Tag from '../components/tag'

const BlogPostTemplate = ({ location, data, pageContext }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const headerImage = post.frontmatter.header_image
  const ogImage = post.frontmatter.og_image
  const { previous, next } = pageContext

  const disqusConfig = {
    shortname: 'browniebroke',
    config: { identifier: pageContext.slug, title: post.frontmatter.title },
  }

  return (
    <Layout location={location} title={siteTitle} headerImage={headerImage}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        image={
          (ogImage && ogImage.childImageSharp.fluid.src) ||
          (headerImage && headerImage.childImageSharp.fluid.src)
        }
      />
      <h1>{post.frontmatter.title}</h1>
      <p
        style={{
          display: `block`,
        }}
      >
        {post.frontmatter.date} • {post.timeToRead} min read
      </p>

      <div dangerouslySetInnerHTML={{ __html: post.html }} />

      <div style={{ paddingBottom: '2rem' }}>
        {post.frontmatter.tags.map((tag, index) => (
          <Tag to={`/tags/${slugify(tag)}/`} key={index}>
            {tag}
          </Tag>
        ))}
      </div>

      <hr />

      <Pagination previous={previous} next={next} />

      <DiscussionEmbed {...disqusConfig} />
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      timeToRead
      frontmatter {
        title
        ...FormattedDate
        description
        tags
        header_image {
          childImageSharp {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        og_image {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
