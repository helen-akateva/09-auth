import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile page",
  description: "Profile page",
};
export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      Test
      {children}
    </>
  );
}