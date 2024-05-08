import {Link} from 'react-router-dom'

function NotFoundPage() {
  return (
    <div>
      This page is not found. Go to <Link to="/">Home</Link>
    </div>
  );
}

export { NotFoundPage };
