import { useNavigate } from "react-router";
import { Button } from "../ui/button";

const stack = [
  {
    name: "Vite",
    url: "https://vite.dev/",
    logo: "/public/vite.svg",
  },
  {
    name: "React",
    url: "https://react.dev/",
    logo: "/src/assets/react.svg",
  },
  {
    name: "Laravel",
    url: "https://laravel.com/",
    logo: "/src/assets/laravel.png",
  },
  {
    name: "GraphQL",
    url: "https://graphql.org/",
    logo: "/src/assets/graphql.png",
  },
  {
    name: "Shadcn",
    url: "https://ui.shadcn.com/",
    logo: "/src/assets/shadcn.png",
  },
];

const Root = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-3xl font-bold text-center mt-8 mb-2">Tech Stack</h2>
        <div className="flex flex-wrap gap-5 justify-center">
          {stack.map((tech) => (
            <div key={tech.name} className="flex flex-col items-center">
              <a
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-5 rounded-lg transition-all hover:-translate-y-1 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <img src={tech.logo} alt={tech.name} className="h-24 w-24 mb-3 object-contain" />
              </a>
              <span className="font-medium">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>

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
