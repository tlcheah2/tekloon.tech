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
        </Page>
    </Layout>);
};

export default WorksPage;