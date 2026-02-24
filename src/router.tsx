import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Solutions from "./pages/Solutions";
import ExamDetail from "./pages/SemesterSolutions";
import QuestionDetail from "./pages/SolutionDetail";
import Questions from "./pages/Questions";
import QuestionBankDetail from "./pages/SemesterQuestions";
import QuestionOnly from "./pages/QuestionDetail";
import Exams from "./pages/Exams";
import Notes from "./pages/Notes";
import TopicCategory from "./pages/TopicCategory";
import TopicDetail from "./pages/TopicDetail";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true,                                        element: <Home /> },
      { path: "solutions",                                  element: <Solutions /> },
      { path: "solutions/:examId",                          element: <ExamDetail /> },
      { path: "solutions/:examId/:questionId",              element: <QuestionDetail /> },
      { path: "questions",                                  element: <Questions /> },
      { path: "questions/:examId",                          element: <QuestionBankDetail /> },
      { path: "questions/:examId/:questionId",              element: <QuestionOnly /> },
      { path: "exams",                                      element: <Exams /> },
      { path: "notes",                                      element: <Notes /> },
      { path: "notes/:category",                            element: <TopicCategory /> },
      { path: "notes/:category/:topic",                     element: <TopicDetail /> },
      { path: "contact",                                    element: <Contact /> },
      { path: "*",                                          element: <PageNotFound /> },
    ],
  },
]);