import AuthForm from "../../components/AuthForm";
import AuthLayout from "../../layouts/AuthLayout";

export default function SignUp() {
  return (
    <AuthLayout>
      <AuthForm type="sign-up" />   
    </AuthLayout>
  );
}
