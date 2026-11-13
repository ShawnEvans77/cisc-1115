import type { ReactNode } from "react";
import { COURSE_CODE } from "../../constants";
import type { Exam, ExamSection, Question } from "../../types";
import { DetailPageLayout } from "../ui/DetailPageLayout";

type QuestionPageLayoutProps = {
  exam: Exam;
  question: Question;
  section: ExamSection;
  children: ReactNode;
  bottomNav: ReactNode;
  headerAction: ReactNode;
};

export function QuestionPageLayout({
  exam,
  question,
  section,
  children,
  bottomNav,
  headerAction,
}: QuestionPageLayoutProps) {
  return (
    <DetailPageLayout
      crumbs={[
        { label: section, to: `/${section}` },
        { label: exam.label, to: `/${section}/${exam.id}` },
        { label: question.title },
      ]}
      eyebrow={`${exam.label} · ${COURSE_CODE}`}
      title={question.title}
      tags={question.topics}
      headerAction={headerAction}
      bottomNav={bottomNav}
    >
      {children}
    </DetailPageLayout>
  );
}
