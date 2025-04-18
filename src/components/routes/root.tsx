import { useNavigate } from "react-router";
import { Button } from "../ui/button";

const Root = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="mt-5 flex gap-2 justify-center">
        <Button variant="outline" onClick={() => navigate("/dashboard")}>
          Dashboard
        </Button>
        <Button variant="outline" onClick={() => navigate("/login")}>
          Login
        </Button>
        <Button variant="outline" onClick={() => navigate("/register")}>
          Register
        </Button>
      </div>
    </div>
  );
};

export default Root;
