import React, { useState } from "react";
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import NavBar from '../components/NavBar';
import styles from './Quiz.module.css';

const Quiz = ({ data }) => {
  const { question, answers, correctAnswer, quizNumber, date, explanation, slug } = data.allSitePage.edges[0].node.context;
  const [showResult, setShowResult] = useState(false);
  const [showNoSelectionMsg, setShowNoSelectionMsg] = useState(false);

  const [selectedAnswer, setSelectedAnswer] = useState();

  const seoTitle = `Daily AWS Quiz ${quizNumber}`;
  return (
    <>
      <SEO title={seoTitle} description={question} isBlogPost={false} path={slug} />
      <NavBar />
      <Layout>
        <div>
          <h2>{seoTitle} ({date})</h2>
          <p>{question}</p>
          {Object.entries(answers).map(([key, answer]) => {
            return (
              <>
                <input type="radio" name="answerSelection" htmlFor={key} value={key} onChange={(value) => { setSelectedAnswer(value) }} />
                <label htmlFor={key}>{answer}</label>
                <br />
              </>
            );
          })}
        </div>
        <button id="submit" onClick={() => {
          if (selectedAnswer) {
            setShowResult(true)
          } else {
            setShowNoSelectionMsg(true)
          }
        }}>Show Answer</button>
        {(showNoSelectionMsg && !showResult) &&
          <p className={styles.errorMsg}>* Please select an answer</p>
        }
        {showResult &&
          <div id="results">
            <p>The correct answer is <strong>{answers[correctAnswer]}</strong>. <strong>{explanation}</strong>
            </p>
          </div>
        }
      </Layout>
    </>
  )
};

export default Quiz

export const query = graphql`
  query ($path: String!) {
    allSitePage(filter: {path: {eq: $path } }) {
      edges {
        node {
          id
          context {
            slug
            question
            correctAnswer
            answers {
              a
              b
              c
            }
            date
            quizNumber
            explanation
          }
          path
        }
      }
    }
  }
`