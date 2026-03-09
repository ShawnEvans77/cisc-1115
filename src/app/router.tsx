import { createBrowserRouter } from "react-router-dom";

import App from "./App";

// Standalones
import Home         from "../pages/Home";
import Contact      from "../pages/Contact";
import PageNotFound from "../pages/PageNotFound";

// Exams
import Exams from "../pages/exams/Exams";

// Questions
import Questions         from "../pages/questions/Questions";
import SemesterQuestions from "../pages/questions/SemesterQuestions";
import QuestionDetail    from "../pages/questions/QuestionDetail";

// Solutions
import Solutions         from "../pages/solutions/Solutions";
import SemesterSolutions from "../pages/solutions/SemesterSolutions";
import SolutionDetail    from "../pages/solutions/SolutionDetail";

// Notes
import Notes       from "../pages/notes/Notes";
import NotesTopic  from "../pages/notes/NotesTopic";
import NotesDetail from "../pages/notes/NotesDetail";

export const router = createBrowserRouter([
  {
    path:     "/",
    element:  <App />,
    children: [
      { index: true,                               element: <Home /> },

      { path: "exams",                             element: <Exams /> },

      { path: "questions",                         element: <Questions /> },
      { path: "questions/:examId",                 element: <SemesterQuestions /> },
      { path: "questions/:examId/:questionId",     element: <QuestionDetail /> },

      { path: "solutions",                         element: <Solutions /> },
      { path: "solutions/:examId",                 element: <SemesterSolutions /> },
      { path: "solutions/:examId/:questionId",     element: <SolutionDetail /> },

      { path: "notes",                             element: <Notes /> },
      { path: "notes/:topicId",                    element: <NotesTopic /> },
      { path: "notes/:topicId/:entryId",           element: <NotesDetail /> },

      { path: "contact",                           element: <Contact /> },
      { path: "*",                                 element: <PageNotFound /> },
    ],
  },
]);