import React from 'react'
import PropTypes from 'prop-types'

import UserPicture from 'components/User/UserPicture'
import PageListMeta from './PageListMeta'
import PagePath from './PagePath'

export default class Page extends React.Component {
  render() {
    const page = this.props.page
    let link = this.props.linkTo
    if (link === '') {
      link = page.path
    }

    return (
      <li className="page-list-li">
        {this.props.children}
        <UserPicture user={page.revision.author} />
        <a className="page-list-link" href={link}>
          <PagePath page={page} excludePathString={this.props.excludePathString} />
        </a>
        <PageListMeta page={page} />
      </li>
    )
  }
}

Page.propTypes = {
  page: PropTypes.object.isRequired,
  linkTo: PropTypes.string,
  excludePathString: PropTypes.string,
  children: PropTypes.element,
}

Page.defaultProps = {
  page: {},
  linkTo: '',
  excludePathString: '',
}
