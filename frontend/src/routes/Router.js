import React, { lazy, Suspense } from 'react';
import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import { CircularProgress, Box } from '@mui/material';

// Add a loading fallback component
const PageLoader = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
    <CircularProgress />
  </Box>
);

/* ***Layouts**** */
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const ExamLayout = Loadable(lazy(() => import('../layouts/full/ExamLayout')));

/* ****Pages***** */
const SamplePage = Loadable(lazy(() => import('../views/sample-page/SamplePage')));
const Success = Loadable(lazy(() => import('../views/Success')));

//Student Routes
const TestPage = Loadable(lazy(() => import('./../views/student/TestPage')));
const ExamPage = Loadable(lazy(() => import('./../views/student/ExamPage')));
const ExamDetails = Loadable(lazy(() => import('./../views/student/ExamDetails')));
const ResultPage = Loadable(lazy(() => import('./../views/student/ResultPage')));
const StudentResultsList = Loadable(lazy(() => import('./../views/student/StudentResultsList')));

//Auth Routes
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const UserAccount = Loadable(lazy(() => import('../views/authentication/UserAccount')));

// Teacher Routes
const CreateExamPage = Loadable(lazy(() => import('./../views/teacher/CreateExamPage')));
const ExamLogPage = Loadable(lazy(() => import('./../views/teacher/ExamLogPage')));
const AddQuestions = Loadable(lazy(() => import('./../views/teacher/AddQuestions')));
const PrivateRoute = Loadable(lazy(() => import('src/views/authentication/PrivateRoute')));
const TeacherRoute = Loadable(lazy(() => import('src/views/authentication/TeacherRoute')));

const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Private Routes */}
      <Route path="" element={<PrivateRoute />}>
        {/* Main layout */}
        <Route
          path="/"
          element={
            <Suspense fallback={<PageLoader />}>
              <FullLayout />
            </Suspense>
          }
        >
          <Route index element={<Navigate to="/dashboard" />} />
          <Route
            path="dashboard"
            element={
              <Suspense fallback={<PageLoader />}>
                <ExamPage />
              </Suspense>
            }
          />
          <Route path="exam" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="sample-page"
            element={
              <Suspense fallback={<PageLoader />}>
                <SamplePage />
              </Suspense>
            }
          />
          <Route
            path="Success"
            element={
              <Suspense fallback={<PageLoader />}>
                <Success />
              </Suspense>
            }
          />
          <Route
            path="exam/:examId/result"
            element={
              <Suspense fallback={<PageLoader />}>
                <ResultPage />
              </Suspense>
            }
          />
          <Route
            path="student/results/all"
            element={
              <Suspense fallback={<PageLoader />}>
                <StudentResultsList />
              </Suspense>
            }
          />
          <Route path="" element={<TeacherRoute />}>
            <Route
              path="create-exam"
              element={
                <Suspense fallback={<PageLoader />}>
                  <CreateExamPage />
                </Suspense>
              }
            />
            <Route
              path="add-questions"
              element={
                <Suspense fallback={<PageLoader />}>
                  <AddQuestions />
                </Suspense>
              }
            />
            <Route
              path="exam-log"
              element={
                <Suspense fallback={<PageLoader />}>
                  <ExamLogPage />
                </Suspense>
              }
            />
          </Route>
        </Route>

        {/* Exam routes using ExamLayout */}
        <Route
          path="exam/:examId"
          element={
            <Suspense fallback={<PageLoader />}>
              <ExamLayout />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<PageLoader />}>
                <ExamDetails />
              </Suspense>
            }
          />
          <Route
            path=":testId"
            element={
              <Suspense fallback={<PageLoader />}>
                <TestPage />
              </Suspense>
            }
          />
        </Route>
      </Route>

      {/* User layout */}
      <Route
        path="user"
        element={
          <Suspense fallback={<PageLoader />}>
            <FullLayout />
          </Suspense>
        }
      >
        <Route
          path="account"
          element={
            <Suspense fallback={<PageLoader />}>
              <UserAccount />
            </Suspense>
          }
        />
      </Route>

      {/* Authentication layout */}
      <Route
        path="auth"
        element={
          <Suspense fallback={<PageLoader />}>
            <BlankLayout />
          </Suspense>
        }
      >
        <Route
          path="404"
          element={
            <Suspense fallback={<PageLoader />}>
              <Error />
            </Suspense>
          }
        />
        <Route
          path="register"
          element={
            <Suspense fallback={<PageLoader />}>
              <Register />
            </Suspense>
          }
        />
        <Route
          path="login"
          element={
            <Suspense fallback={<PageLoader />}>
              <Login />
            </Suspense>
          }
        />
      </Route>
    </>,
  ),
);

export default Router;
