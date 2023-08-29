import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <p>Page not found - 404</p>
      <p className="navigate" onClick={() => navigate('/')}>Navigate back to Home Page</p>
    </div>
  )
}

export default NotFoundPage;
