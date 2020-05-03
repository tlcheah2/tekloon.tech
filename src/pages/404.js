import React from 'react';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import NavBar from '../components/NavBar';

export default () => (
    <>
        <NavBar />
        <Seo />
        <Layout>
            <h1>Page Not Found</h1>
        </Layout>
    </>
)