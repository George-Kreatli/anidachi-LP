import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Bloü Quit Smoking",
    default: "Quit smoking guides & tools | Bloü",
  },
};

export default function QuitSmokingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
