export type ExamPdf = {
  id: string;
  label: string;
  year: string;
  pdf: string;
};

export const examPdfs: ExamPdf[] = [
  { id: "fall2017", label: "fall 2017", year: "2017", pdf: "/exams/cisc_fall_2017.pdf" },
  { id: "fall2018", label: "fall 2018", year: "2018", pdf: "/exams/cisc_fall_2018.pdf" },
  { id: "fall2020", label: "fall 2020", year: "2020", pdf: "/exams/cisc_fall_2020.pdf" },
  { id: "spring2021", label: "spring 2021", year: "2021", pdf: "/exams/cisc_spring_2021.pdf" },
  { id: "spring2023", label: "spring 2023", year: "2023", pdf: "/exams/cisc_spring_2023.pdf" },
];
