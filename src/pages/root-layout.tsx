import { useEffect } from "react";
import { Outlet, useMatches } from "react-router";

export const RootLayout = () => {
  const matches = useMatches();

  useEffect(() => {
    const title = [...matches]
      .reverse()
      .map(({ handle }) => {
        if (
          typeof handle === "object" &&
          handle !== null &&
          "title" in handle &&
          typeof handle.title === "string"
        ) {
          return handle.title;
        }

        return undefined;
      })
      .find((title): title is string => Boolean(title));

    if (title) document.title = title;
  }, [matches]);

  return <Outlet />;
};
