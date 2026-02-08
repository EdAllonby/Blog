import { constants } from "@/utils/constants";

export function Title() {
  return (
    <h1 className="self-center text-5xl leading-normal font-extrabold md:text-[5rem]">
      {constants.websiteName}
    </h1>
  );
}
