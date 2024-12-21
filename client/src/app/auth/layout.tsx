import EmailUserVerifyContextProvider from "@/context/auth/emailUserVerify.context";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <EmailUserVerifyContextProvider>
      {children}
    </EmailUserVerifyContextProvider>
  );
}
