import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "../pages/Home";

// Every page but Home loads on first visit, so the landing page does not download
// the exams, the notes, and the note tools. App wraps the outlet in Suspense.
const Contact = lazy(() => import("../pages/Contact"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));
const Exams = lazy(() => import("../pages/exams/Exams"));
const Questions = lazy(() => import("../pages/questions/Questions"));
const SemesterQuestions = lazy(() => import("../pages/questions/SemesterQuestions"));
const QuestionDetail = lazy(() => import("../pages/questions/QuestionDetail"));
const Solutions = lazy(() => import("../pages/solutions/Solutions"));
const SemesterSolutions = lazy(() => import("../pages/solutions/SemesterSolutions"));
const SolutionDetail = lazy(() => import("../pages/solutions/SolutionDetail"));
const Notes = lazy(() => import("../pages/notes/Notes"));
const NotesTopic = lazy(() => import("../pages/notes/NotesTopic"));
const NotesDetail = lazy(() => import("../pages/notes/NotesDetail"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "exams", element: <Exams /> },
      { path: "questions", element: <Questions /> },
      { path: "questions/:examId", element: <SemesterQuestions /> },
      { path: "questions/:examId/:questionId", element: <QuestionDetail /> },
      { path: "solutions", element: <Solutions /> },
      { path: "solutions/:examId", element: <SemesterSolutions /> },
      { path: "solutions/:examId/:questionId", element: <SolutionDetail /> },
      { path: "notes", element: <Notes /> },
      { path: "notes/:topicId", element: <NotesTopic /> },
      { path: "notes/:topicId/:entryId", element: <NotesDetail /> },
      { path: "contact", element: <Contact /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
]);
