// src/pages/QuestionDetail.tsx
import React from "react";
import { Link, useParams } from "react-router-dom";
import { exams } from "../data/exams";
import { QuestionPageLayout, QuestionNotFound } from "../components/QuestionPageLayout";
import { ContentBlock, PromptLines } from "../components/ContentBlock";

function QuestionDetail(): React.ReactElement {
  const { examId, questionId } = useParams<{ examId: string; questionId: string }>();
  const exam     = exams.find(e => e.id === examId);
  const question = exam?.questions.find(q => q.id === questionId);

  if (!exam || !question) {
    return <QuestionNotFound backTo="/questions" backLabel="← Back to questions" />;
  }

  return (
    <QuestionPageLayout
      exam={exam}
      question={question}
      basePath="/questions"
      bottomNav={
        <>
          <Link to={`/questions/${exam.id}`} className="back-link">
            ← All {exam.label} questions
          </Link>
          <Link to={`/solutions/${exam.id}/${question.id}`} className="solution-link">
            View solution →
          </Link>
        </>
      }
    >
      <ContentBlock label="The Question">
        <PromptLines text={question.prompt} />
        {question.mathHtml && (
          <div className="math-display" dangerouslySetInnerHTML={{ __html: question.mathHtml }} />
        )}
      </ContentBlock>
    </QuestionPageLayout>
  );
}

export default QuestionDetail;