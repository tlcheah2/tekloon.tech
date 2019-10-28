import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Page from '../components/Page';
import { useSiteMetadata } from '../hooks';

const WorksPage = () => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  return (<Layout title={`${siteTitle}`}>
        <Sidebar />
        <Page title="Works">
            <div>
                <h3><Link to="/works/four-card-feature">Four Card Feature Section</Link></h3>
                <p>This is the solution for <a href="https://www.frontendmentor.io/challenges/four-card-feature-section-weK1eFYK">Four Card Feature Section Challenges</a> in Frontend Mentor.</p>
            </div>
            <div>
                <h3><Link to="/works/minimalism-blog/">Minimalism Blog using Pure HTML & CSS</Link></h3>
                <p>A project of Web Responsive Design Bootcamp by <a href="https://scrimba.com/g/gresponsive">Kevin Powell's course</a></p>
            </div>
        </Page>
    </Layout>);
};

export default WorksPage;