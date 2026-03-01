import { createBrowserRouter } from "react-router-dom";
import App               from "./App";
import Home              from "./pages/Home";
import Contact           from "./pages/Contact";
import PageNotFound      from "./pages/PageNotFound";
import Exams             from "./pages/Exams";
import Solutions         from "./pages/Solutions";
import SemesterSolutions from "./pages/SemesterSolutions";
import SolutionDetail    from "./pages/SolutionDetail";
import Questions         from "./pages/Questions";
import SemesterQuestions from "./pages/SemesterQuestions";
import QuestionDetail    from "./pages/QuestionDetail";
import Notes             from "./pages/Notes";
import NotesTopic        from "./pages/NotesTopic";
import NotesDetail       from "./pages/NotesDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true,                                        element: <Home /> },

      { path: "solutions",                                  element: <Solutions /> },
      { path: "solutions/:examId",                          element: <SemesterSolutions /> },
      { path: "solutions/:examId/:questionId",              element: <SolutionDetail /> },

      { path: "questions",                                  element: <Questions /> },
      { path: "questions/:examId",                          element: <SemesterQuestions /> },
      { path: "questions/:examId/:questionId",              element: <QuestionDetail /> },

      { path: "exams",                                      element: <Exams /> },

      { path: "notes",                                      element: <Notes /> },
      { path: "notes/:topicId",                             element: <NotesTopic /> },
      { path: "notes/:topicId/:entryId",                    element: <NotesDetail /> },

      { path: "contact",                                    element: <Contact /> },
      { path: "*",                                          element: <PageNotFound /> },
    ],
  },
]);