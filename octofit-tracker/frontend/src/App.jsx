import { Link, Route, Routes } from 'react-router-dom';

function HomePage() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">
              <span className="badge text-bg-dark mb-3">OctoFit Tracker</span>
              <h1 className="display-5 fw-semibold">Modern multi-tier starter</h1>
              <p className="lead text-body-secondary">
                React 19 runs on port 5173, the Express API runs on port 8000,
                and MongoDB stays on port 27017.
              </p>
              <div className="d-flex gap-3 flex-wrap mt-4">
                <a className="btn btn-primary" href="http://localhost:8000/api/health">
                  API health check
                </a>
                <Link className="btn btn-outline-dark" to="/about">
                  About the stack
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function AboutPage() {
  return (
    <main className="container py-5">
      <h1 className="h2 mb-3">Initialized stack</h1>
      <ul className="list-group">
        <li className="list-group-item">Frontend: React 19 + Vite + Bootstrap</li>
        <li className="list-group-item">Routing: react-router-dom</li>
        <li className="list-group-item">Backend: Node.js + Express + TypeScript</li>
        <li className="list-group-item">Data access: Mongoose for MongoDB</li>
      </ul>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}