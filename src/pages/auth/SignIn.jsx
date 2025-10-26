import AuthForm from "../../components/AuthForm";
import AuthLayout from "../../layouts/AuthLayout";

export default function SignIn() {
  return (
    <AuthLayout>
      <AuthForm type="sign-in" />
    </AuthLayout>
  );
}
