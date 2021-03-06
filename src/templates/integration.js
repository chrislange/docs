import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import { graphql } from 'gatsby'
import Prism from 'prismjs'
import Img from "gatsby-image"

import Layout from '../components/layouts/default'
// import integrationIcon from '../images/integration-icon.png'
import { Spirit } from '../components/spirit-styles'
import TOC from '../components/layouts/partials/toc'
import MetaData from '../components/layouts/partials/meta-data'
import RelatedPosts from '../components/global/related-posts'
import Tags from '../components/helpers/tags'

class Integration extends React.Component {
    componentDidMount() {
        // TODO: Prism for Webpack currently supports basic languages. `handlebars`,
        // `yaml`, and `json` are not amongst those. To load those languages, we'd
        // need to load them specifically following the webpack instructions here:
        // https://prismjs.com/#examples and https://github.com/mAAdhaTTah/babel-plugin-prismjs
        // The other option is to create a plugin for GhostPosts.
        Prism.highlightAll()
    }

    render() {
        const post = this.props.data.ghostPost
        const { relatedPosts } = this.props.pageContext
        const title = `Ghost + ${post.title} Integration`

        return (
            <>
                <MetaData data={this.props.data} location={this.props.location} type="article" title={title} />
                <Layout>
                    <div className="pa-vw4 tc">
                        <h1 className="ma0 pa0 f2-ns f1-m f-headline-l">{post.title} + Ghost</h1>
                        <p className="ma0 mt2 f5 f4-l midgrey">How to use Ghost and {post.title} together</p>
                        <div className="flex items-center justify-center mt5">
                            <div className="flex-shrink-0 flex justify-center items-center h20 w20 h30-l w30-l pa5 pa10-l bg-white br-100 shadow-3 nl2 nr2">
                                <img className="mw100" src={post.feature_image} alt={post.title} />
                            </div>
                            <div className="flex-shrink-0 flex justify-center items-center h20 w20 h30-l w30-l pa6 pa11-l bg-white br-100 shadow-3 nl2 nr2">
                                <Img fixed={this.props.data.file.childImageSharp.fixed} alt="Ghost" />
                            </div>
                        </div>
                    </div>
                    <div className={ Spirit.page.l + `flex` }>
                        <div className="w-100 pa15 pt13 bg-white br4 shadow-1 flex flex-column flex-row-ns flex-start">
                            <div className="order-2">
                                <div className="nr3 sticky-ns top-25">
                                    <div className="dn db-ns"><TOC className="miw50" headingsOffset="-400" /></div>
                                    {relatedPosts.length ?
                                        <div className="miw50 mw-content-ns mt15">
                                            <h3 className="f4 measure--0-2 middarkgrey ma0 mb3 pa0 fw4">You might also like...</h3>
                                            <RelatedPosts relatedPosts={relatedPosts} showImages/>
                                        </div> :
                                        null
                                    }
                                </div>
                            </div>
                            <article className="w-100 order-1 pr15-ns">
                                <div className="mb0 f8">
                                    <Link className="link midlightgrey fw5" to="/integrations/">Integrations</Link>
                                    <span className="mr1 ml1 f8 midgrey">/</span>
                                    <Tags
                                        post={post}
                                        separator="false"
                                        html={true}
                                        classes="darkgrey fw5"
                                        linkToPrefix="integrations"
                                        linkClasses="link darkgrey fw6"
                                    />
                                </div>
                                <section className="post-content integration-content" dangerouslySetInnerHTML={{ __html: post.html }} />
                            </article>
                        </div>
                    </div>
                </Layout>
            </>
        )
    }
}

Integration.propTypes = {
    data: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    pageContext: PropTypes.shape({
        relatedPosts: PropTypes.array.isRequired,
    }).isRequired,
}

export default Integration

export const articleQuery = graphql`
    query($slug: String!) {
        site {
            ...SiteMetaFields
        }
        ghostPost(slug: { eq: $slug }) {
            ...GhostPostFields
        }
        file(relativePath: {eq: "integration-icon.png"}) {
            childImageSharp {
                fixed(width: 30, height: 30) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
    }
`
