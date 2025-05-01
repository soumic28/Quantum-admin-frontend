import { useNavigate } from "react-router-dom";
import { Button } from "../ui";

const Home = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("accessToken");
  return (
    <div className="flex w-screen h-screen justify-center items-center flex-col gap-2">
      <h1 className="text-3xl font-bold">Welcome to the Admin </h1>

      {/**check if login if not then logout */}
      {!isAuthenticated ? (
        <>
          <p className="text-white">login to access </p>
          <Button
            variant={"custom"}
            size="xl"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </>
      ) : (
        <>
        <p>Welcome back </p>
          <Button
            variant={"secondary"}
            size="xl"
            onClick={() => {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              localStorage.removeItem("role");
              navigate("/");
            }}
          >
            Logout
          </Button>
          <Button
            variant={"default"}
            size="xl"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Dashboard
          </Button>
        </>
      )}
    </div>
  );
};

export default Home;
