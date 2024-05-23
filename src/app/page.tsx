import Dark from "@/components/darkMode";
import Main from "./home";

export default function Home() {
  return (
    <section>
      <div className="flex justify-around items-center gap-[50px] w-full mt-[14px] p-2">
        <h1 className="text-2xl">Day's Task</h1>
        <Dark />
      </div>
      <div>
        <Main />
      </div>
    </section>
  );
}
